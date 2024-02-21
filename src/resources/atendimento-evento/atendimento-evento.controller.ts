import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AtendimentoEventoService } from './atendimento-evento.service';
import { CreateAtendimentoEventoDto } from './dto/create-atendimento-evento.dto';
import { UpdateAtendimentoEventoDto } from './dto/update-atendimento-evento.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AtendimentoEvento } from './entities/atendimento-evento.entity';

@ApiBearerAuth()
@ApiTags('Atendimento Evento')
@Controller('atendimento/:codigoAtendimento/eventos')
export class AtendimentoEventoController {
  constructor(private readonly AtendimentoEventoService: AtendimentoEventoService) { }

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo evento' })
  @ApiResponse({ status: 201, description: 'Created', type: AtendimentoEvento })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @Body() createAtendimentoEventoDto: CreateAtendimentoEventoDto,
    @Param('codigoAtendimento') codigoAtendimento: string
  ) {
    /* Adicionando o codigo de atendimento do parametro */
    createAtendimentoEventoDto.codigo_atendimento = +codigoAtendimento;
    return this.AtendimentoEventoService.create(createAtendimentoEventoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Consultar todos os eventos de um atendimento' })
  @ApiResponse({ status: 200, description: 'OK', type: [AtendimentoEvento] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@Param('codigoAtendimento') codigoAtendimento: string) {
    return this.AtendimentoEventoService.findAll(+codigoAtendimento);
  }

  @Get(':codigo')
  @ApiOperation({ summary: 'Consultar um evento de um atendimento' })
  @ApiResponse({ status: 200, description: 'OK', type: AtendimentoEvento })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorize' })
  findOne(
    @Param('codigoAtendimento') codigoAtendimento: string,
    @Param('codigo') codigo: string
  ) {
    return this.AtendimentoEventoService.findByCodigo(+codigoAtendimento, +codigo);
  }

  @Patch(':codigo')
  @ApiOperation({ summary: 'Editar um evento um atendimento' })
  @ApiResponse({ status: 200, description: 'OK', type: AtendimentoEvento })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(
    @Param('codigoAtendimento') codigoAtendimento: string,
    @Param('codigo') codigo: string,
    @Body() updateAtendimentoEventoDto: UpdateAtendimentoEventoDto,
  ) {
    /* Adicionando o codigo de atendimento do parametro */
    updateAtendimentoEventoDto.codigo_atendimento = +codigoAtendimento;
    return this.AtendimentoEventoService.update(+codigo, updateAtendimentoEventoDto);
  }

  @Delete(':codigo')
  @ApiOperation({ summary: 'Deletar um evento um atendimento' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(
    @Param('codigoAtendimento') codigoAtendimento: string,
    @Param('codigo') codigo: string
  ) {
    return this.AtendimentoEventoService.remove(+codigoAtendimento, +codigo);
  }
}