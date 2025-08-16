import { PrismaService } from '../prisma/prisma.service';
import { SubmitApplicationDto } from './dto/submit-application.dto';
import { ApplicationStatus } from '@prisma/client';
export declare class ApplicationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(applicantId: string, dto: SubmitApplicationDto): Promise<{
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
    }>;
    updateStatus(applicationId: string, staffUserId: string, newStatus: ApplicationStatus): Promise<{
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
    }>;
    findMyApplications(applicantId: string): Promise<({
        openCall: {
            title: string;
            author: {
                university: {
                    name: string;
                };
                departmentName: string;
            };
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
