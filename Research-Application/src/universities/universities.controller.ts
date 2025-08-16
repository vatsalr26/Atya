import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('universities')
export class UniversitiesController {
    constructor(private readonly universitiesService: UniversitiesService) { }

    @Get()
    findAll() {
        return this.universitiesService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() data: { name: string; country: string }) {
        return this.universitiesService.create(data);
    }
}