import { ProjectType, JobType, OpenCallStatus } from '@prisma/client';
declare class CriterionDto {
    criterion: string;
    weight?: number;
}
declare class CustomQuestionDto {
    question: string;
    type: 'text' | 'textarea' | 'file';
}
export declare class CreateOpenCallDto {
    reviewPeriodStartDate: string;
    notificationDate: string;
    status?: OpenCallStatus;
    title: string;
    summary: string;
    researchArea: string;
    keywords: string[];
    projectTypes: ProjectType[];
    targetNumberOfAwards: number;
    assistanceOffered?: string;
    eligibleCountries: string[];
    eligibleCareerStages: JobType[];
    requiresProposal?: boolean;
    proposalTemplateUrl?: string;
    customApplicationQuestions?: CustomQuestionDto[];
    evaluationCriteria?: CriterionDto[];
    fundingType: string;
    fundingAmount: string;
    submissionOpenDate: string;
    submissionDeadline: string;
}
export {};
