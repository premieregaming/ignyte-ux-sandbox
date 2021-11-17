import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {

    return this.appService.getHello();
  }

  @Get('echo')
  echo(): string {

    return "echo";
  }

  @Get('ping')
  ping(): Object {

    return { "data": this.appService.ping() }
  }
}
