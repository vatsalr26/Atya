import { ProposalsService } from './proposals.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
export declare class ProposalsController {
    private readonly proposalsService;
    constructor(proposalsService: ProposalsService);
    create(user: {
        profileId: string;
    }, createProposalDto: CreateProposalDto): import(".prisma/client").Prisma.Prisma__ProposalClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        researcherProfileId: string;
        title: string;
        content: import("@prisma/client/runtime/library").JsonValue;
        isFinal: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
