import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    console.log('Creating user with data:', createUserDto);
    return this.prisma.client.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.client.findMany();
  }

  findOne(id: string) {
    return this.prisma.client.findUnique({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.client.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.client.delete({ where: { id } });
  }
}
