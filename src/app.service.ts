import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sayHi(): string {
    return 'Hi';
  }
}
