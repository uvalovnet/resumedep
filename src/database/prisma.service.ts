import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, 'query'> implements OnModuleInit, OnModuleDestroy {

  constructor() {
    super({ log: [{ emit: 'event', level: 'query' }] });
    if (process.env.LOG_SQL === 'true') {
      this.$on('query', (event) => console.log(`[SQL ${event.duration}ms] ${event.query}`));
    }
  }

  async onModuleInit() { await this.$connect(); }
  
  async onModuleDestroy() { await this.$disconnect(); }
}
