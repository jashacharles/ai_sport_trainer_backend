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

  async create(createSessionDto: CreateSessionDto) {
    const session = await this.prisma.session.create({
      data: {
        projectId: createSessionDto.projectId,
        description: createSessionDto.description,
      },
    });

    const objectKey = `sessions/${session.id}/video.mp4`;
    const uploadUrl = await this.minio.getUploadUrl(objectKey);

    await this.prisma.session.update({
      where: { id: session.id },
      data: { videoKey: objectKey },
    });

    return { session, uploadUrl };
  }

  async requestModelInference() {
    const { text } = await generateText({
      model: llmgateway('gemini-3.5-flash'),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'file',
              data: 'place holder',
              mediaType: 'video/mp4',
            },
            {
              type: 'text',
              text: 'Analyze the forehand, the goal is to have better speed and just a bit more spin.',
            },
          ],
        },
      ],
    });

    return { text };
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
