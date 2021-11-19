import { staticBlock } from '@babel/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

    getHello(): string {
      return "Asdf"
    }

    ping(): string {
      return "pong"
    }
}
