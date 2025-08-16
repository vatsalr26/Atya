import { IsString, IsOptional, IsUrl } from 'class-validator';

export class UpdateUniversityProfileDto {
    @IsString()
    universityId: string;

    @IsString() departmentName: string;
    @IsString() @IsOptional() faculty?: string;
    @IsUrl() @IsOptional() logoUrl?: string;
    @IsUrl() @IsOptional() bannerImageUrl?: string;
    @IsString() @IsOptional() address?: string;
    @IsUrl() @IsOptional() websiteUrl?: string;
    @IsString() @IsOptional() description?: string;
}