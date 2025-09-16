import { NestFactory } from '@nestjs/core';
import { ConsoleLogger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/all-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'CT20250915-restful',
    }),
  });

  // swagger 설정
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API 문서')
    .setDescription('(주)사각 코딩테스트')
    .setVersion('1.0')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, documentFactory, {
    customSiteTitle: 'CT20250915-restful API Docs',
    swaggerOptions: {
      supportedSubmitMethods: ['get', 'post', 'put', 'delete'],
    },
  });

  // 포트 설정
  const configService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT', 3000);

  // Exception filter 등록
  app.useGlobalFilters(new AllExceptionFilter());

  // API 버전 관리 활성화
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '',
  });

  await app.listen(port);
}
bootstrap();
