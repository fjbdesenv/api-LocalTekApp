import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('doc')
  getHello(): string {
    return this.appService.getMessageApi();
  }
}
