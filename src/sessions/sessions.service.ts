import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PrismaService } from '../prisma/prisma.service';
import { MinioService } from '../minio/minio.service';
import { llmgateway } from '@llmgateway/ai-sdk-provider';
import { generateText } from 'ai';

@Injectable()
export class SessionsService {
  constructor(
    private prisma: PrismaService,
    private minio: MinioService,
  ) {}

  async requestUploadUrl(userId: string, createSessionDto: CreateSessionDto) {
    const session = await this.prisma.session.create({
      data: {
        userId,
        projectId: createSessionDto.projectId,
        description: createSessionDto.description,
      },
    });

    const objectKey = `${userId}/${createSessionDto.projectId}/${session.id}/video.mp4`;
    const uploadUrl = await this.minio.getUploadUrl(objectKey);

    return { session, uploadUrl };
  }

  findAll() {
    return this.prisma.session.findMany();
  }

  findOne(id: string) {
    return this.prisma.session.findUnique({ where: { id } });
  }

  update(id: string, updateSessionDto: UpdateSessionDto) {
    return this.prisma.session.update({ where: { id }, data: updateSessionDto });
  }

  remove(id: string) {
    return this.prisma.session.delete({ where: { id } });
  }
}
