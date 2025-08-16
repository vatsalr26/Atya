import { IsEmail, IsEnum, MinLength, IsOptional, IsString } from 'class-validator';
import { UserRole } from '@prisma/client';

export class RegisterUserDto {
    @IsEmail({}, { message: 'Please provide a valid email address.' })
    email: string;

    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    password: string;

    @IsEnum(UserRole, { message: 'Role must be either RESEARCHER or UNIVERSITY_STAFF.' })
    role: UserRole;

    @IsString()
    @IsOptional()
    universityId?: string;
}