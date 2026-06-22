import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { SessionsService } from '../sessions/sessions.service';
import { SessionsController } from '../sessions/sessions.controller';

@Module({
  controllers: [UsersController, SessionsController],
  providers: [UsersService, PrismaService, SessionsService],
})
export class UsersModule {}
