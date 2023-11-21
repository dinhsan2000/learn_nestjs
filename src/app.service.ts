import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
