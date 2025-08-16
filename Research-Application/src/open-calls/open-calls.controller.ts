import { Controller, Post, Get, Param, Query, Body, UseGuards } from '@nestjs/common';
import { OpenCallsService } from './open-calls.service';
import { CreateOpenCallDto } from './dto/create-open-call.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { GetUser } from '../auth/get-user.decorator'; // Import the decorator

@Controller('open-calls')
export class OpenCallsController {
    constructor(private readonly openCallsService: OpenCallsService) { }

    @Roles(UserRole.UNIVERSITY_STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(
        @GetUser() user: { profileId: string }, // Use decorator here
        @Body() dto: CreateOpenCallDto,
    ) {
        const universityProfileId = user.profileId; // Get profileId safely
        return this.openCallsService.create(universityProfileId, dto);
    }

    @Get()
    findAll(@Query() query: { page?: number; limit?: number; researchArea?: string; country?: string }) {
        return this.openCallsService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.openCallsService.findOne(id);
    }

    @Roles(UserRole.UNIVERSITY_STAFF)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id/applications')
    findApplicationsForCall(
        @Param('id') openCallId: string,
        @GetUser() user: { sub: string }, // Use decorator here
    ) {
        const staffUserId = user.sub; // Get user ID safely
        return this.openCallsService.findApplicationsForCall(openCallId, staffUserId);
    }
}