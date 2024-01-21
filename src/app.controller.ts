import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageHealth } from './class/MessageHealth';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Redirect('doc')
  @ApiOperation({ summary: 'Rota raiz, é redirecionanda para /doc' })
  getHello(): object {
    return this.appService.getMessageApi();
  }

  @Get('health')
  @ApiOperation({ summary: 'Rota para verificar a saúde da aplicação' })
  @ApiResponse({ status: 200, description: 'OK', type: MessageHealth})
  health(): object {
    return this.appService.getMessageApi();
  }
}
