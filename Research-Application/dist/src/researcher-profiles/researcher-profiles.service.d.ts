import { PrismaService } from '../prisma/prisma.service';
import { UpdateResearcherProfileDto } from './dto/update-researcher-profile.dto';
export declare class ResearcherProfilesService {
    private prisma;
    constructor(prisma: PrismaService);
    update(userId: string, dto: UpdateResearcherProfileDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        professionalTitle: string | null;
        currentInstitution: string | null;
        currentLocation: string | null;
        userId: string;
    }>;
}
