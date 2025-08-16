import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from '../auth/roles.guard';

@Controller('proposals')
export class ProposalsController {
    constructor(private readonly proposalsService: ProposalsService) { }

    @Roles(UserRole.RESEARCHER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(
        @GetUser() user: { profileId: string },
        @Body() createProposalDto: CreateProposalDto,
    ) {
        return this.proposalsService.create(user.profileId, createProposalDto);
    }
}