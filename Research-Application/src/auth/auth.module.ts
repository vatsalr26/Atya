import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
// Import your social strategies if you created them
// import { OrcidStrategy } from './orcid.strategy';
// import { LinkedinStrategy } from './linkedin.strategy';
// import { GoogleStrategy } from './google.strategy';

@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET, // Make sure JWT_SECRET is in your .env file
            signOptions: { expiresIn: '24h' }, // Token expires in 24 hours
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        // Add your social strategies here to make them available
        // OrcidStrategy,
        // LinkedinStrategy,
        // GoogleStrategy,
    ],
})
export class AuthModule { }