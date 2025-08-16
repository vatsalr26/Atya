import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(registerUserDto: RegisterUserDto) {
        const { email, password, role, universityId } = registerUserDto;
        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new ConflictException('An account with this email already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
            },
        });

        let profileId: string | undefined;

        if (role === 'RESEARCHER') {
            const profile = await this.prisma.researcherProfile.create({
                data: {
                    userId: user.id,
                    fullName: 'New User',
                    currentLocation: 'Not specified',
                    professionalTitle: 'Not specified',
                    currentInstitution: 'Not specified',
                }
            });
            profileId = profile.id;
        } else if (role === 'UNIVERSITY_STAFF') {
            if (!universityId) {
                throw new Error('University ID is required for staff members.');
            }
            const profile = await this.prisma.universityProfile.create({
                data: {
                    userId: user.id,
                    departmentName: 'New Department',
                    universityId: universityId,
                }
            });
            profileId = profile.id;
        }

        const payload = { sub: user.id, email: user.email, role: user.role, profileId: profileId };
        const accessToken = this.jwtService.sign(payload);

        const { password: _, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            access_token: accessToken,
        };
    }

    async login(loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
        // Find the user and include their profile
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: {
                researcherProfile: true,
                universityProfile: true,
            },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const profileId = user.role === 'RESEARCHER' ? user.researcherProfile?.id : user.universityProfile?.id;
        const payload = { sub: user.id, email: user.email, role: user.role, profileId: profileId };
        const accessToken = this.jwtService.sign(payload);

        const { password: _, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            access_token: accessToken,
        };
    }

    async validateSocialUser(profile: { orcidId?: string; linkedInId?: string; googleId?: string; fullName: string; email?: string }, providerField: 'orcidId' | 'linkedInId' | 'googleId') {
        let whereClause;
        if (providerField === 'orcidId') {
            whereClause = { orcidId: profile.orcidId };
        } else if (providerField === 'linkedInId') {
            whereClause = { linkedInId: profile.linkedInId };
        } else {
            whereClause = { googleId: profile.googleId };
        }

        const existingUser = await this.prisma.user.findUnique({ where: whereClause });

        if (existingUser) {
            const payload = { sub: existingUser.id, email: existingUser.email, role: existingUser.role };
            const accessToken = this.jwtService.sign(payload);
            const { password: _, ...userWithoutPassword } = existingUser;
            return { user: userWithoutPassword, access_token: accessToken };
        }

        // CORRECTED: Only use fields that exist in your ResearcherProfile model
        const newUser = await this.prisma.user.create({
            data: {
                [providerField]: profile[providerField],
                email: profile.email,
                role: 'RESEARCHER',
                researcherProfile: {
                    create: {
                        fullName: profile.fullName,
                        currentLocation: "Not specified", // This field exists in your schema
                        // Removed professionalTitle and currentInstitution - they don't exist in your schema!
                    }
                }
            },
            include: {
                researcherProfile: true,
            }
        });

        const payload = {
            sub: newUser.id,
            email: newUser.email,
            role: newUser.role,
            profileId: newUser.researcherProfile?.id
        };
        const accessToken = this.jwtService.sign(payload);
        const { password: _, ...userWithoutPassword } = newUser;
        return { user: userWithoutPassword, access_token: accessToken };
    }
}

/* 
DEBUGGING STEPS TO TRY:

1. Clear TypeScript cache and restart VS Code:
   - Close VS Code
   - Delete node_modules/@types folder
   - Run: npm install
   - Restart VS Code

2. Force regenerate Prisma:
   - Delete node_modules/.prisma folder
   - Run: npx prisma generate --force
   - Run: npm run build

3. Check your schema.prisma file contains:
   model ResearcherProfile {
     id                   String  @id @default(uuid())
     fullName            String
     professionalTitle   String?
     currentInstitution  String?
     currentLocation     String?  // Make sure this line exists
     // ... other fields
     user                User    @relation(fields: [userId], references: [id])
     userId              String  @unique
   }

4. If problem persists, try explicit typing:
   Replace the create block with:
   researcherProfile: {
     create: {
       fullName: profile.fullName,
       professionalTitle: "Not specified",
       currentInstitution: "Not specified",
     } as any
   }

5. Alternative approach - Create profile separately:
   const newUser = await this.prisma.user.create({
     data: {
       [providerField]: profile[providerField],
       email: profile.email,
       role: 'RESEARCHER',
     }
   });

   const researcherProfile = await this.prisma.researcherProfile.create({
     data: {
       userId: newUser.id,
       fullName: profile.fullName,
       professionalTitle: "Not specified",
       currentInstitution: "Not specified",
       currentLocation: "Not specified",
     }
   });

   const userWithProfile = await this.prisma.user.findUnique({
     where: { id: newUser.id },
     include: { researcherProfile: true }
   });
*/