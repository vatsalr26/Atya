import { Module } from '@nestjs/common';
import { ResearcherProfilesService } from './researcher-profiles.service';
import { ResearcherProfilesController } from './researcher-profiles.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ResearcherProfilesController],
    providers: [ResearcherProfilesService],
})
export class ResearcherProfilesModule { }