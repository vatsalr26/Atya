import { UniversityProfilesService } from './university-profiles.service';
import { UpdateUniversityProfileDto } from './dto/update-university-profile.dto';
export declare class UniversityProfilesController {
    private readonly universityProfilesService;
    constructor(universityProfilesService: UniversityProfilesService);
    update(user: {
        sub: string;
    }, dto: UpdateUniversityProfileDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        departmentName: string;
        faculty: string | null;
        logoUrl: string | null;
        bannerImageUrl: string | null;
        address: string | null;
        websiteUrl: string | null;
        description: string | null;
        universityId: string;
    }>;
}
