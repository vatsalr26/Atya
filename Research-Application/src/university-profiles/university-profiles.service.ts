import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUniversityProfileDto } from './dto/update-university-profile.dto';

@Injectable()
export class UniversityProfilesService {
    constructor(private prisma: PrismaService) { }

    async update(userId: string, dto: UpdateUniversityProfileDto) {
        const { universityId, ...profileData } = dto;
        return this.prisma.universityProfile.upsert({
            where: { userId },
            update: profileData,
            create: {
                userId,
                universityId,
                ...profileData,
            },
        });
    }
}