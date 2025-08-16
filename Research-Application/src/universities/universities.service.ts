import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UniversitiesService {
    constructor(private prisma: PrismaService) { }

    async create(data: { name: string; country: string }) {
        return this.prisma.university.create({ data });
    }

    async findAll() {
        return this.prisma.university.findMany();
    }
}