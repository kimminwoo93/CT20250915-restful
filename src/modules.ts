import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { FoodModule } from './food/food.module';
import { CacheModule } from '@nestjs/cache-manager';

export const modules = [
  ConfigModule.forRoot({
    envFilePath: ['.env.local', '.env'],
    isGlobal: true,
  }),
  CacheModule.register({ ttl: 60, isGlobal: true }),
  PrismaModule,
  FoodModule,
];
