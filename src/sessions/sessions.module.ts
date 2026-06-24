import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { MinioModule } from '../minio/minio.module';
import { PrismaService } from '../prisma/prisma.service';


@Module({
  imports: [MinioModule],
  controllers: [SessionsController],
  providers: [SessionsService, PrismaService],
  exports: [SessionsService],
})
export class SessionsModule {}
