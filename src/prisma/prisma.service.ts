import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect(); // Establishes the database connection when the module loads
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Closes the database connection when the app stops
  }
}
