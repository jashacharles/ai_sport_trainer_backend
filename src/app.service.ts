import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    console.log("fsa")
    return 'Hello World!';
  }
}
