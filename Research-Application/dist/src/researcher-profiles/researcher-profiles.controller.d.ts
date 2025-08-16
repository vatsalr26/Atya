import { UpdateResearcherProfileDto } from './dto/update-researcher-profile.dto';
import { ResearcherProfilesService } from './researcher-profiles.service';
export declare class ResearcherProfilesController {
    private readonly researcherProfilesService;
    constructor(researcherProfilesService: ResearcherProfilesService);
    update(user: {
        sub: string;
    }, dto: UpdateResearcherProfileDto): Promise<{
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
