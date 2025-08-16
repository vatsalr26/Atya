import { Controller, Put, Body, Req, UseGuards } from '@nestjs/common';
import { UniversityProfilesService } from './university-profiles.service';
import { UpdateUniversityProfileDto } from './dto/update-university-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { GetUser } from '../auth/get-user.decorator';

@Controller('university-profiles')
export class UniversityProfilesController {
    constructor(private readonly universityProfilesService: UniversityProfilesService) { }

    @Roles(UserRole.UNIVERSITY_STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('me')
    update(@GetUser() user: { sub: string }, @Body() dto: UpdateUniversityProfileDto) { // 2. Use the decorator here
        const userId = user.sub; // 3. No more errors!
        return this.universityProfilesService.update(userId, dto);
    }
}