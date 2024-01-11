import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConfRemessaService } from './conf-remessa.service';
import { CreateConfRemessaDto } from './dto/create-conf-remessa.dto';
import { UpdateConfRemessaDto } from './dto/update-conf-remessa.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfRemessa } from './entities/conf-remessa.entity';

@ApiTags('Configuração de Remessa')
@Controller('conf-remessa')
export class ConfRemessaController {
  constructor(private readonly confRemessaService: ConfRemessaService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar uma nova configuração de remessa' })
  @ApiResponse({ status: 201, description: 'Created', type: ConfRemessa })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createConfRemessaDto: CreateConfRemessaDto) {
    return this.confRemessaService.create(createConfRemessaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Consultar todas as configuração de remessa' })
  @ApiResponse({ status: 200, description: 'OK', type: [ConfRemessa] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.confRemessaService.findAll();
  }

  @Get(':codigo')
  @ApiOperation({ summary: 'Consultar uma configuração de remessa' })
  @ApiResponse({ status: 200, description: 'OK', type: ConfRemessa })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorize' })
  findOne(@Param('codigo') codigo: string) {
    return this.confRemessaService.findByCodigo(+codigo);
  }

  @Patch(':codigo')
  @ApiOperation({ summary: 'Editar uma configuração de remessa' })
  @ApiResponse({ status: 200, description: 'OK', type: ConfRemessa })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(
    @Param('codigo') codigo: string,
    @Body() updateConfRemessaDto: UpdateConfRemessaDto,
  ) {
    return this.confRemessaService.update(+codigo, updateConfRemessaDto);
  }

  @Delete(':codigo')
  @ApiOperation({ summary: 'Deletar uma configuração de remessa' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('codigo') codigo: string) {
    return this.confRemessaService.remove(+codigo);
  }
}
