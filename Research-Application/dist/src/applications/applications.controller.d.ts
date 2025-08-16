import { ApplicationsService } from './applications.service';
import { SubmitApplicationDto } from './dto/submit-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    create(user: {
        profileId: string;
    }, dto: SubmitApplicationDto): Promise<{
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
    updateStatus(applicationId: string, user: {
        sub: string;
    }, dto: UpdateApplicationStatusDto): Promise<{
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
    findMyApplications(user: {
        profileId: string;
    }): Promise<({
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
