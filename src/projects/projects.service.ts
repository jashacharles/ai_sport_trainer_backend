import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(clientId: string, dto: CreateProjectDto) {
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

  findOne(id: string) {
    return this.prisma.project.findUnique({ where: { id } });
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: {
        projectName: updateProjectDto.projectName,
        projectGoal: updateProjectDto.goal,
        sportType: updateProjectDto.sportType,
      },
    });
  }

  remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}
