import { PrismaService } from '../prisma/prisma.service';
import { CreateOpenCallDto } from './dto/create-open-call.dto';
export declare class OpenCallsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(authorId: string, dto: CreateOpenCallDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        summary: string;
        researchArea: string;
        keywords: string[];
        projectTypes: import(".prisma/client").$Enums.ProjectType[];
        targetNumberOfAwards: number;
        assistanceOffered: string | null;
        eligibleInstitutionTypes: string[];
        eligibleCountries: string[];
        eligibleCareerStages: import(".prisma/client").$Enums.JobType[];
        requiresProposal: boolean;
        proposalTemplateUrl: string | null;
        customApplicationQuestions: import("@prisma/client/runtime/library").JsonValue | null;
        evaluationCriteria: import("@prisma/client/runtime/library").JsonValue | null;
        fundingType: string;
        fundingAmount: string;
        submissionOpenDate: Date;
        submissionDeadline: Date;
        reviewPeriodStartDate: Date;
        notificationDate: Date;
        status: import(".prisma/client").$Enums.OpenCallStatus;
        authorId: string;
    }>;
    findAll(query: {
        page?: number;
        limit?: number;
        researchArea?: string;
        country?: string;
    }): Promise<{
        data: ({
            author: {
                university: {
                    name: string;
                    country: string;
                };
                departmentName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            summary: string;
            researchArea: string;
            keywords: string[];
            projectTypes: import(".prisma/client").$Enums.ProjectType[];
            targetNumberOfAwards: number;
            assistanceOffered: string | null;
            eligibleInstitutionTypes: string[];
            eligibleCountries: string[];
            eligibleCareerStages: import(".prisma/client").$Enums.JobType[];
            requiresProposal: boolean;
            proposalTemplateUrl: string | null;
            customApplicationQuestions: import("@prisma/client/runtime/library").JsonValue | null;
            evaluationCriteria: import("@prisma/client/runtime/library").JsonValue | null;
            fundingType: string;
            fundingAmount: string;
            submissionOpenDate: Date;
            submissionDeadline: Date;
            reviewPeriodStartDate: Date;
            notificationDate: Date;
            status: import(".prisma/client").$Enums.OpenCallStatus;
            authorId: string;
        })[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    findOne(id: string): Promise<{
        author: {
            university: {
                name: string;
                country: string;
            };
            departmentName: string;
            logoUrl: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        summary: string;
        researchArea: string;
        keywords: string[];
        projectTypes: import(".prisma/client").$Enums.ProjectType[];
        targetNumberOfAwards: number;
        assistanceOffered: string | null;
        eligibleInstitutionTypes: string[];
        eligibleCountries: string[];
        eligibleCareerStages: import(".prisma/client").$Enums.JobType[];
        requiresProposal: boolean;
        proposalTemplateUrl: string | null;
        customApplicationQuestions: import("@prisma/client/runtime/library").JsonValue | null;
        evaluationCriteria: import("@prisma/client/runtime/library").JsonValue | null;
        fundingType: string;
        fundingAmount: string;
        submissionOpenDate: Date;
        submissionDeadline: Date;
        reviewPeriodStartDate: Date;
        notificationDate: Date;
        status: import(".prisma/client").$Enums.OpenCallStatus;
        authorId: string;
    }>;
    findApplicationsForCall(openCallId: string, staffUserId: string): Promise<({
        applicant: {
            education: {
                id: string;
                country: string;
                degree: string;
                fieldOfStudy: string;
                institution: string;
                startDate: Date;
                endDate: Date | null;
                researcherProfileId: string;
            }[];
            publications: {
                id: string;
                researcherProfileId: string;
                title: string;
                journal: string | null;
                year: number;
                link: string | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            professionalTitle: string | null;
            currentInstitution: string | null;
            currentLocation: string | null;
            userId: string;
        };
    } & {
        id: string;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        submittedAt: Date;
        submittedCoverLetter: string | null;
        customApplicationAnswers: import("@prisma/client/runtime/library").JsonValue | null;
        offerType: import(".prisma/client").$Enums.OfferType | null;
        offerConditions: string | null;
        offerRespondedAt: Date | null;
        researcherResponse: import(".prisma/client").$Enums.OfferResponse | null;
        applicantId: string;
        openCallId: string;
        submittedProposalId: string | null;
    })[]>;
}
