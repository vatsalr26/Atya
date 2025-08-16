import { Module } from '@nestjs/common';
import { OpenCallsService } from './open-calls.service';
import { OpenCallsController } from './open-calls.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [OpenCallsController],
    providers: [OpenCallsService],
})
export class OpenCallsModule { }