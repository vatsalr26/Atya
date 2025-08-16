import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateResearcherProfileDto } from './dto/update-researcher-profile.dto';

@Injectable()
export class ResearcherProfilesService {
    constructor(private prisma: PrismaService) { }

    async update(userId: string, dto: UpdateResearcherProfileDto) {
        return this.prisma.researcherProfile.upsert({
            where: { userId },
            update: { ...dto },
            create: {
                userId,
                ...dto,
            },
        });
    }
}