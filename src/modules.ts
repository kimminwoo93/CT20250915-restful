import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

export const modules: Promise<DynamicModule>[] = [
  ConfigModule.forRoot({
    envFilePath: ['.env.local', '.env'],
    isGlobal: true,
  }),
];
