import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { SessionsModule } from './sessions/sessions.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MinioModule } from './minio/minio.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, MinioModule, UsersModule, ProjectsModule, SessionsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
