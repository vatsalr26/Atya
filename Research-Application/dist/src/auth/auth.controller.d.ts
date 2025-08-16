import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerUserDto: RegisterUserDto): Promise<{
        user: {
            id: string;
            email: string | null;
            googleId: string | null;
            linkedInId: string | null;
            orcidId: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            createdAt: Date;
            updatedAt: Date;
        };
        access_token: string;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        user: {
            researcherProfile: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                fullName: string;
                professionalTitle: string | null;
                currentInstitution: string | null;
                currentLocation: string | null;
                userId: string;
            };
            universityProfile: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                departmentName: string;
                faculty: string | null;
                logoUrl: string | null;
                bannerImageUrl: string | null;
                address: string | null;
                websiteUrl: string | null;
                description: string | null;
                universityId: string;
            };
            id: string;
            email: string | null;
            googleId: string | null;
            linkedInId: string | null;
            orcidId: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            createdAt: Date;
            updatedAt: Date;
        };
        access_token: string;
    }>;
    orcidAuth(): Promise<void>;
    orcidAuthRedirect(req: any, res: any): Promise<any>;
    linkedinAuth(): Promise<void>;
    linkedinAuthRedirect(req: any, res: any): Promise<any>;
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: any, res: any): Promise<any>;
}
