import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';

@ApiBearerAuth()
@ApiTags('Usuário')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Created', type: Usuario })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Consultar todos os usuário' })
  @ApiResponse({ status: 200, description: 'OK', type: [Usuario] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':codigo')
  @ApiOperation({ summary: 'Consultar um status' })
  @ApiResponse({ status: 200, description: 'OK', type: Usuario })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorize' })
  findOne(@Param('codigo') codigo: string) {
    return this.usuarioService.findByCodigo(+codigo);
  }

  @Patch(':codigo')
  @ApiOperation({ summary: 'Editar um usuário' })
  @ApiResponse({ status: 200, description: 'OK', type: Usuario })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(
    @Param('codigo') codigo: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.update(+codigo, updateUsuarioDto);
  }

  @Delete(':codigo')
  @ApiOperation({ summary: 'Deletar um usuário' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('codigo') codigo: string) {
    return this.usuarioService.remove(+codigo);
  }
}
