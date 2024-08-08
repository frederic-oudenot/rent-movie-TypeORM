import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  //endpoint : Hello world
  getHello(): string {
    return 'Hello World!';
  }
}
