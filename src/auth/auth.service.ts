import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    console.log('Creating auth with data:', createAuthDto);
    const user = await this.prisma.client.findUnique({
      where: { email: createAuthDto.email },
    });

    if (!user || user.password !== createAuthDto.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const projects = await this.projectsService.findAll(user.id);

    const access_token = this.jwtService.sign({ sub: user.id, email: user.email });

    console.log('Login successful for user:', user.email);
    const { password, ...clientData } = user;
    return { access_token, client: clientData, projects };
  }
 

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
