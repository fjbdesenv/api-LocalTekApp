import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BancoService } from './banco.service';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Banco } from './entities/banco.entity';

@ApiTags('Banco')
@Controller('banco')
export class BancoController {
  constructor(private readonly bancoService: BancoService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo banco' })
  @ApiResponse({ status: 201, description: 'Created', type: Banco })
  @ApiResponse({ status:401, description: 'Unauthorized' })
  create(@Body() createBancoDto: CreateBancoDto) {
    return this.bancoService.create(createBancoDto);
  }

  @Get()
  @ApiOperation({summary: 'Consultar todos os banco'})
  @ApiResponse({ status: 200, description: 'OK', type: [Banco] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.bancoService.findAll();
  }

  @Get(':codigo')
  @ApiOperation({summary: 'Consultar um banco'})
  @ApiResponse({ status: 200, description: 'OK', type: Banco })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorize' })
  findOne(@Param('codigo') codigo: string) {
    return this.bancoService.findByCodigo(+codigo);
  }

  @Patch(':codigo')
  @ApiOperation({summary: 'Editar um banco'})
  @ApiResponse({ status: 200, description: 'OK', type: Banco })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('codigo') codigo: string, @Body() updateBancoDto: UpdateBancoDto) {
    return this.bancoService.update(+codigo, updateBancoDto);
  }

  @Delete(':codigo')
  @ApiOperation({summary: 'Deletar um banco'})
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('codigo') codigo: string) {
    return this.bancoService.remove(+codigo);
  }
}
