import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { Token } from '../class/Token';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Autenticação de usuário' })
  @ApiResponse({ status: 200, description: 'OK', type: Token })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  signIn(@Body() AuthDto: AuthDto) {
    return this.authService.signIn(AuthDto);
  }
}
