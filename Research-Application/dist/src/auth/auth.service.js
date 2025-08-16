"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(registerUserDto) {
        const { email, password, role, universityId } = registerUserDto;
        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new common_1.ConflictException('An account with this email already exists.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
            },
        });
        let profileId;
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
        }
        else if (role === 'UNIVERSITY_STAFF') {
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
    async login(loginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: {
                researcherProfile: true,
                universityProfile: true,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials.');
        }
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            throw new common_1.UnauthorizedException('Invalid credentials.');
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
    async validateSocialUser(profile, providerField) {
        let whereClause;
        if (providerField === 'orcidId') {
            whereClause = { orcidId: profile.orcidId };
        }
        else if (providerField === 'linkedInId') {
            whereClause = { linkedInId: profile.linkedInId };
        }
        else {
            whereClause = { googleId: profile.googleId };
        }
        const existingUser = await this.prisma.user.findUnique({ where: whereClause });
        if (existingUser) {
            const payload = { sub: existingUser.id, email: existingUser.email, role: existingUser.role };
            const accessToken = this.jwtService.sign(payload);
            const { password: _, ...userWithoutPassword } = existingUser;
            return { user: userWithoutPassword, access_token: accessToken };
        }
        const newUser = await this.prisma.user.create({
            data: {
                [providerField]: profile[providerField],
                email: profile.email,
                role: 'RESEARCHER',
                researcherProfile: {
                    create: {
                        fullName: profile.fullName,
                        currentLocation: "Not specified",
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map