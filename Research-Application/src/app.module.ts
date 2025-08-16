import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UniversitiesModule } from './universities/universities.module';
import { ResearcherProfilesModule } from './researcher-profiles/researcher-profiles.module';
import { UniversityProfilesModule } from './university-profiles/university-profiles.module';
import { OpenCallsModule } from './open-calls/open-calls.module';
import { ApplicationsModule } from './applications/applications.module';
import { ProposalsModule } from './proposals/proposals.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UniversitiesModule,
    ProposalsModule,
    ResearcherProfilesModule,
    UniversityProfilesModule,
    OpenCallsModule,
    ApplicationsModule,
  ],
})
export class AppModule { }