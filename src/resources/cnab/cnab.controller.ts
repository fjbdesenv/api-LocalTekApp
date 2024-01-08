import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CnabService } from './cnab.service';
import { CreateCnabDto } from './dto/create-cnab.dto';
import { UpdateCnabDto } from './dto/update-cnab.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cnab } from './entities/cnab.entity';

@ApiTags('Cnab')
@Controller('cnab')
export class CnabController {
  constructor(private readonly cnabService: CnabService) { }

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo cnab' })
  @ApiResponse({ status: 201, description: 'Created', type: Cnab })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createCnabDto: CreateCnabDto) {
    return this.cnabService.create(createCnabDto);
  }

  @Get()
  @ApiOperation({ summary: 'Consultar todos os cnab' })
  @ApiResponse({ status: 200, description: 'OK', type: [Cnab] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.cnabService.findAll();
  }

  @Get(':codigo')
  @ApiOperation({ summary: 'Consultar um cnab' })
  @ApiResponse({ status: 200, description: 'OK', type: Cnab })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorize' })
  findOne(@Param('codigo') codigo: string) {
    return this.cnabService.findByCodigo(+codigo);
  }

  @Patch(':codigo')
  @ApiOperation({ summary: 'Editar um cnab' })
  @ApiResponse({ status: 200, description: 'OK', type: Cnab })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('codigo') codigo: string, @Body() updateCnabDto: UpdateCnabDto) {
    return this.cnabService.update(+codigo, updateCnabDto);
  }

  @Delete(':codigo')
  @ApiOperation({ summary: 'Deletar um cnab' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('codigo') codigo: string) {
    return this.cnabService.remove(+codigo);
  }
}
