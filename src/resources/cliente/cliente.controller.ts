import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cliente } from './entities/cliente.entity';

@ApiTags('Cliente')
@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiOperation({summary: 'Cadastrar um novo cliente'})
  @ApiResponse({ status: 201, description: 'Created', type: Cliente })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  @ApiOperation({summary: 'Consultar todos os cliente'})
  @ApiResponse({ status: 200, description: 'OK', type: [Cliente] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':codigo')
  @ApiOperation({summary: 'Consultar um cliente'})
  @ApiResponse({ status: 200, description: 'OK', type: Cliente })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorize' })
  findOne(@Param('codigo') codigo: string) {
    return this.clienteService.findByCodigo(+codigo);
  }

  @Patch(':codigo')
  @ApiOperation({summary: 'Editar um cliente'})
  @ApiResponse({ status: 200, description: 'OK', type: Cliente })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('codigo') codigo: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(+codigo, updateClienteDto);
  }

  @Delete(':codigo')
  @ApiOperation({summary: 'Deletar um cliente'})
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('codigo') codigo: string) {
    return this.clienteService.remove(+codigo);
  }
}
