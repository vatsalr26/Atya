import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    @Get('orcid')
    @UseGuards(AuthGuard('orcid'))
    async orcidAuth() { }

    @Get('orcid/callback')
    @UseGuards(AuthGuard('orcid'))
    async orcidAuthRedirect(@Req() req: any, @Res() res: any) {
        const { user, access_token } = req.user;
        return res.json({ user, access_token });
    }

    @Get('linkedin')
    @UseGuards(AuthGuard('linkedin'))
    async linkedinAuth() { }

    @Get('linkedin/callback')
    @UseGuards(AuthGuard('linkedin'))
    async linkedinAuthRedirect(@Req() req: any, @Res() res: any) {
        const { user, access_token } = req.user;
        return res.json({ user, access_token });
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() { }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: any, @Res() res: any) {
        const { user, access_token } = req.user;
        return res.json({ user, access_token });
    }
}