import { JobType } from '@prisma/client';
export declare class UpdateResearcherProfileDto {
    fullName: string;
    profilePictureUrl?: string;
    currentLocation?: string;
    professionalTitle?: string;
    currentInstitution?: string;
    personalWebsiteUrl?: string;
    mainDiscipline?: string;
    researchKeywords?: string[];
    skills?: string[];
    preferredCountries?: string[];
    preferredJobTypes?: JobType[];
    availabilityDate?: string;
}
