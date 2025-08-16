import { PrismaService } from '../prisma/prisma.service';
export declare class UniversitiesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        name: string;
        country: string;
    }): Promise<{
        id: string;
        name: string;
        country: string;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        country: string;
    }[]>;
}
