import { PrismaService } from '../prisma/prisma.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
export declare class ProposalsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(researcherProfileId: string, data: CreateProposalDto): import(".prisma/client").Prisma.Prisma__ProposalClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        researcherProfileId: string;
        title: string;
        content: import("@prisma/client/runtime/library").JsonValue;
        isFinal: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
