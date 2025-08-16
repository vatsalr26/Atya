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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ApplicationsService = class ApplicationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(applicantId, dto) {
        const { openCallId, submittedProposalId, ...applicationData } = dto;
        const openCall = await this.prisma.openCall.findUnique({ where: { id: openCallId } });
        if (!openCall) {
            throw new common_1.NotFoundException('Open Call not found.');
        }
        const now = new Date();
        const deadline = new Date(openCall.submissionDeadline);
        if (openCall.status !== client_1.OpenCallStatus.OPEN || now > deadline) {
            throw new common_1.BadRequestException('This Open Call is no longer accepting applications.');
        }
        const existingApplication = await this.prisma.application.findFirst({
            where: { applicantId, openCallId },
        });
        if (existingApplication) {
            throw new common_1.ForbiddenException('You have already applied to this Open Call.');
        }
        return this.prisma.application.create({
            data: {
                ...applicationData,
                applicant: { connect: { id: applicantId } },
                openCall: { connect: { id: openCallId } },
                submittedProposal: { connect: { id: submittedProposalId } },
            },
        });
    }
    async updateStatus(applicationId, staffUserId, newStatus) {
        const application = await this.prisma.application.findUnique({
            where: { id: applicationId },
            select: { openCall: { select: { author: { select: { userId: true } } } } },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application with ID "${applicationId}" not found.`);
        }
        if (application.openCall.author.userId !== staffUserId) {
            throw new common_1.ForbiddenException('You are not authorized to update this application.');
        }
        return this.prisma.application.update({
            where: { id: applicationId },
            data: { status: newStatus },
        });
    }
    async findMyApplications(applicantId) {
        return this.prisma.application.findMany({
            where: { applicantId },
            include: {
                openCall: {
                    select: {
                        title: true,
                        author: {
                            select: {
                                departmentName: true,
                                university: { select: { name: true } },
                            },
                        },
                    },
                },
            },
            orderBy: { submittedAt: 'desc' },
        });
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map