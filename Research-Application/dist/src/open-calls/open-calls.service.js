"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenCallsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let OpenCallsService = class OpenCallsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(authorId, dto) {
        const { customApplicationQuestions, evaluationCriteria, ...restOfDto } = dto;
        return this.prisma.openCall.create({
            data: {
                ...restOfDto,
                customApplicationQuestions: customApplicationQuestions,
                evaluationCriteria: evaluationCriteria,
                author: {
                    connect: { id: authorId },
                },
            },
        });
    }
    async findAll(query) {
        const { page = 1, limit = 10, researchArea, country } = query;
        const skip = (page - 1) * limit;
        const whereClause = {
            status: client_1.OpenCallStatus.OPEN,
            ...(researchArea && { researchArea }),
            ...(country && { author: { university: { country } } }),
        };
        const [openCalls, total] = await this.prisma.$transaction([
            this.prisma.openCall.findMany({
                where: whereClause,
                skip,
                take: Number(limit),
                include: {
                    author: {
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
    async findOne(id) {
        const openCall = await this.prisma.openCall.findUnique({
            where: { id, status: client_1.OpenCallStatus.OPEN },
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
            throw new common_1.NotFoundException(`Open Call with ID "${id}" not found.`);
        }
        return openCall;
    }
    async findApplicationsForCall(openCallId, staffUserId) {
        const openCall = await this.prisma.openCall.findUnique({
            where: { id: openCallId },
            include: { author: { select: { userId: true } } },
        });
        if (!openCall) {
            throw new common_1.NotFoundException(`Open Call with ID "${openCallId}" not found.`);
        }
        if (openCall.author.userId !== staffUserId) {
            throw new common_1.ForbiddenException('You are not authorized to view applications for this Open Call.');
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
};
exports.OpenCallsService = OpenCallsService;
exports.OpenCallsService = OpenCallsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OpenCallsService);
//# sourceMappingURL=open-calls.service.js.map