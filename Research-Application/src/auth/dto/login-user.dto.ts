import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
    @IsEmail({}, { message: 'Please provide a valid email address.' })
    email: string;

    @IsNotEmpty({ message: 'Password cannot be empty.' })
    password: string;
}