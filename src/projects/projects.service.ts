import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(clientId: string, dto: CreateProjectDto) {
    console.log("Creating project with data:", dto, "for clientId:", clientId);
    return this.prisma.project.create({
      data: {
        projectName: dto.projectName,
        projectGoal: dto.goal,
        sportType: dto.sportType,
        clientId,
      },
    });
  }

  async findAll(clientId: string) {
    return this.prisma.project.findMany({
      where: { clientId },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
