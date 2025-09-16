import { Controller, Get, Version } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Sample')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Version('1')
  @ApiOperation({ summary: '샘플', description: '샘플 API' })
  @ApiOkResponse({
    description: 'ok',
    content: {
      'text/html': {
        example: 'Hi',
      },
    },
  })
  @Get()
  sayHi(): string {
    return this.appService.sayHi();
  }
}
