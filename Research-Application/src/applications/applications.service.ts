import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubmitApplicationDto } from './dto/submit-application.dto';
import { ApplicationStatus, OpenCallStatus } from '@prisma/client';

@Injectable()
export class ApplicationsService {
    constructor(private prisma: PrismaService) { }

    async create(applicantId: string, dto: SubmitApplicationDto) {
        const { openCallId, submittedProposalId, ...applicationData } = dto;

        const openCall = await this.prisma.openCall.findUnique({ where: { id: openCallId } });

        if (!openCall) {
            throw new NotFoundException('Open Call not found.');
        }

        // This is the corrected date check
        const now = new Date();
        const deadline = new Date(openCall.submissionDeadline);

        if (openCall.status !== OpenCallStatus.OPEN || now > deadline) {
            throw new BadRequestException('This Open Call is no longer accepting applications.');
        }

        const existingApplication = await this.prisma.application.findFirst({
            where: { applicantId, openCallId },
        });
        if (existingApplication) {
            throw new ForbiddenException('You have already applied to this Open Call.');
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

    async updateStatus(applicationId: string, staffUserId: string, newStatus: ApplicationStatus) {
        const application = await this.prisma.application.findUnique({
            where: { id: applicationId },
            select: { openCall: { select: { author: { select: { userId: true } } } } },
        });

        if (!application) {
            throw new NotFoundException(`Application with ID "${applicationId}" not found.`);
        }

        if (application.openCall.author.userId !== staffUserId) {
            throw new ForbiddenException('You are not authorized to update this application.');
        }

        return this.prisma.application.update({
            where: { id: applicationId },
            data: { status: newStatus },
        });
    }

    async findMyApplications(applicantId: string) {
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
}