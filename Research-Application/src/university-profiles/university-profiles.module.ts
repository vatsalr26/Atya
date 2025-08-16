import { Module } from '@nestjs/common';
import { UniversityProfilesService } from './university-profiles.service';
import { UniversityProfilesController } from './university-profiles.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [UniversityProfilesController],
    providers: [UniversityProfilesService],
})
export class UniversityProfilesModule { }