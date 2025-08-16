import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProposalDto } from './dto/create-proposal.dto';

@Injectable()
export class ProposalsService {
    constructor(private prisma: PrismaService) { }

    // Creates a proposal and links it to the researcher's profile
    create(researcherProfileId: string, data: CreateProposalDto) {
        return this.prisma.proposal.create({
            data: {
                ...data,
                researcherProfile: {
                    connect: { id: researcherProfileId },
                },
            },
        });
    }
}