import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator'; // 1. Import the decorator
import { UpdateResearcherProfileDto } from './dto/update-researcher-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResearcherProfilesService } from './researcher-profiles.service';

@Controller('researcher-profiles')
export class ResearcherProfilesController {
    constructor(private readonly researcherProfilesService: ResearcherProfilesService) { }

    @UseGuards(JwtAuthGuard)
    @Put('me')
    update(@GetUser() user: { sub: string }, @Body() dto: UpdateResearcherProfileDto) { // 2. Use the decorator
        const userId = user.sub; // 3. Error is solved
        return this.researcherProfilesService.update(userId, dto);
    }
}