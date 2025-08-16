import {
    IsString, IsArray, IsEnum, IsDateString, IsInt,
    IsBoolean, IsOptional, IsUrl, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProjectType, JobType, OpenCallStatus } from '@prisma/client';

class CriterionDto {
    @IsString()
    criterion: string;

    @IsInt() @IsOptional()
    weight?: number;
}

class CustomQuestionDto {
    @IsString()
    question: string;

    @IsString()
    type: 'text' | 'textarea' | 'file';
}

export class CreateOpenCallDto {
    @IsDateString()
    reviewPeriodStartDate: string;

    @IsDateString()
    notificationDate: string;


    @IsEnum(OpenCallStatus)
    @IsOptional()
    status?: OpenCallStatus;

    @IsString()
    title: string;

    @IsString()
    summary: string;

    @IsString()
    researchArea: string;

    @IsArray() @IsString({ each: true })
    keywords: string[];

    @IsArray() @IsEnum(ProjectType, { each: true })
    projectTypes: ProjectType[];

    @IsInt()
    targetNumberOfAwards: number;

    @IsString() @IsOptional()
    assistanceOffered?: string;

    @IsArray() @IsString({ each: true })
    eligibleCountries: string[];

    @IsArray() @IsEnum(JobType, { each: true })
    eligibleCareerStages: JobType[];

    @IsBoolean() @IsOptional()
    requiresProposal?: boolean;

    @IsUrl() @IsOptional()
    proposalTemplateUrl?: string;

    @IsArray() @ValidateNested({ each: true }) @Type(() => CustomQuestionDto) @IsOptional()
    customApplicationQuestions?: CustomQuestionDto[];

    @IsArray() @ValidateNested({ each: true }) @Type(() => CriterionDto) @IsOptional()
    evaluationCriteria?: CriterionDto[];

    @IsString()
    fundingType: string;

    @IsString()
    fundingAmount: string;

    @IsDateString()
    submissionOpenDate: string;

    @IsDateString()
    submissionDeadline: string;
}