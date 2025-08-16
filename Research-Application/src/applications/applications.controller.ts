import { Controller, Post, Patch, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { SubmitApplicationDto } from './dto/submit-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { GetUser } from '../auth/get-user.decorator'; // Import the decorator

@Controller('applications')
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) { }

    @Roles(UserRole.RESEARCHER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@GetUser() user: { profileId: string }, @Body() dto: SubmitApplicationDto) {
        const researcherProfileId = user.profileId; // Fixed
        return this.applicationsService.create(researcherProfileId, dto);
    }

    @Roles(UserRole.UNIVERSITY_STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id/status')
    updateStatus(
        @Param('id') applicationId: string,
        @GetUser() user: { sub: string }, // Use the decorator
        @Body() dto: UpdateApplicationStatusDto,
    ) {
        const staffUserId = user.sub; // Fixed
        return this.applicationsService.updateStatus(applicationId, staffUserId, dto.status);
    }

    @Roles(UserRole.RESEARCHER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('me')
    findMyApplications(@GetUser() user: { profileId: string }) {
        const researcherProfileId = user.profileId; // Fixed
        return this.applicationsService.findMyApplications(researcherProfileId);
    }
}