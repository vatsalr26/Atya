import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOpenCallDto } from './dto/create-open-call.dto';
import { OpenCallStatus } from '@prisma/client';

@Injectable()
export class OpenCallsService {
    constructor(private prisma: PrismaService) { }

    async create(authorId: string, dto: CreateOpenCallDto) {
        const { customApplicationQuestions, evaluationCriteria, ...restOfDto } = dto;

        return this.prisma.openCall.create({
            data: {
                ...restOfDto,
                // Cast the complex objects to 'any' to satisfy Prisma's Json type
                customApplicationQuestions: customApplicationQuestions as any,
                evaluationCriteria: evaluationCriteria as any,
                author: {
                    connect: { id: authorId },
                },
            },
        });
    }

    async findAll(query: { page?: number; limit?: number; researchArea?: string; country?: string }) {
        const { page = 1, limit = 10, researchArea, country } = query;
        const skip = (page - 1) * limit;

        const whereClause = {
            status: OpenCallStatus.OPEN,
            ...(researchArea && { researchArea }),
            ...(country && { author: { university: { country } } }),
        };

        const [openCalls, total] = await this.prisma.$transaction([
            this.prisma.openCall.findMany({
                where: whereClause,
                skip,
                take: Number(limit),
                include: {
                    author: { // Include info about the university
                        select: {
                            departmentName: true,
                            university: {
                                select: { name: true, country: true },
                            },
                        },
                    },
                },
                orderBy: { submissionDeadline: 'asc' },
            }),
            this.prisma.openCall.count({ where: whereClause }),
        ]);

        return {
            data: openCalls,
            total,
            page: Number(page),
            lastPage: Math.ceil(total / Number(limit)),
        };
    }

    async findOne(id: string) {
        const openCall = await this.prisma.openCall.findUnique({
            where: { id, status: OpenCallStatus.OPEN },
            include: {
                author: {
                    select: {
                        departmentName: true,
                        logoUrl: true,
                        university: {
                            select: { name: true, country: true },
                        },
                    },
                },
            },
        });

        if (!openCall) {
            throw new NotFoundException(`Open Call with ID "${id}" not found.`);
        }
        return openCall;
    }

    async findApplicationsForCall(openCallId: string, staffUserId: string) {
        const openCall = await this.prisma.openCall.findUnique({
            where: { id: openCallId },
            include: { author: { select: { userId: true } } },
        });

        if (!openCall) {
            throw new NotFoundException(`Open Call with ID "${openCallId}" not found.`);
        }

        if (openCall.author.userId !== staffUserId) {
            throw new ForbiddenException('You are not authorized to view applications for this Open Call.');
        }

        return this.prisma.application.findMany({
            where: { openCallId },
            include: {
                applicant: {
                    include: {
                        education: true,
                        publications: true,
                    }
                },
            },
            orderBy: { submittedAt: 'asc' },
        });
    }
}