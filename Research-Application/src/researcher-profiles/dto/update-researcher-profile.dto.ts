import { IsString, IsOptional, IsArray, IsEnum, IsDateString, IsUrl } from 'class-validator';
import { JobType } from '@prisma/client';

export class UpdateResearcherProfileDto {
    @IsString() fullName: string;
    @IsUrl() @IsOptional() profilePictureUrl?: string;
    @IsString() @IsOptional() currentLocation?: string;
    @IsString() @IsOptional() professionalTitle?: string;
    @IsString() @IsOptional() currentInstitution?: string;
    @IsUrl() @IsOptional() personalWebsiteUrl?: string;
    @IsString() @IsOptional() mainDiscipline?: string;
    @IsArray() @IsString({ each: true }) @IsOptional() researchKeywords?: string[];
    @IsArray() @IsString({ each: true }) @IsOptional() skills?: string[];
    @IsArray() @IsString({ each: true }) @IsOptional() preferredCountries?: string[];
    @IsArray() @IsEnum(JobType, { each: true }) @IsOptional() preferredJobTypes?: JobType[];
    @IsDateString() @IsOptional() availabilityDate?: string;
}