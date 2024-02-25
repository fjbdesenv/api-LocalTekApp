import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AtendimentoArquivoService } from './atendimento-arquivo.service';
import { CreateAtendimentoArquivoDto } from './dto/create-atendimento-arquivo.dto';
import { UpdateAtendimentoArquivoDto } from './dto/update-atendimento-arquivo.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AtendimentoArquivo } from './entities/atendimento-arquivo.entity';

@ApiBearerAuth()
@ApiTags('Atendimento Arquivo')
@Controller('atendimento/:codigoAtendimento/arquivos')
export class AtendimentoArquivoController {
  constructor(private readonly atendimentoArquivoService: AtendimentoArquivoService) { }

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo arquivo' })
  @ApiResponse({ status: 201, description: 'Created', type: AtendimentoArquivo })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @Body() createAtendimentoArquivoDto: CreateAtendimentoArquivoDto,
    @Param('codigoAtendimento') codigoAtendimento: string
  ) {
    /* Adicionando o codigo de atendimento do parametro */
    createAtendimentoArquivoDto.codigo_atendimento = +codigoAtendimento;
    return this.atendimentoArquivoService.create(createAtendimentoArquivoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Consultar todos os arquivos de um atendimento' })
  @ApiResponse({ status: 200, description: 'OK', type: [AtendimentoArquivo] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@Param('codigoAtendimento') codigoAtendimento: string) {
    return this.atendimentoArquivoService.findAll(+codigoAtendimento);
  }

  @Get(':codigo')
  @ApiOperation({ summary: 'Consultar um arquivo de um atendimento' })
  @ApiResponse({ status: 200, description: 'OK', type: AtendimentoArquivo })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorize' })
  findOne(
    @Param('codigoAtendimento') codigoAtendimento: string,
    @Param('codigo') codigo: string
  ) {
    return this.atendimentoArquivoService.findByCodigo(+codigoAtendimento, +codigo);
  }

  @Patch(':codigo')
  @ApiOperation({ summary: 'Editar um arquivo um atendimento' })
  @ApiResponse({ status: 200, description: 'OK', type: AtendimentoArquivo })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(
    @Param('codigoAtendimento') codigoAtendimento: string,
    @Param('codigo') codigo: string,
    @Body() updateAtendimentoArquivoDto: UpdateAtendimentoArquivoDto,
  ) {
    /* Adicionando o codigo de atendimento do parametro */
    updateAtendimentoArquivoDto.codigo_atendimento = +codigoAtendimento;
    return this.atendimentoArquivoService.update(+codigo, updateAtendimentoArquivoDto);
  }

  @Delete(':codigo')
  @ApiOperation({ summary: 'Deletar um arquivo um atendimento' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(
    @Param('codigoAtendimento') codigoAtendimento: string,
    @Param('codigo') codigo: string
  ) {
    return this.atendimentoArquivoService.remove(+codigoAtendimento, +codigo);
  }
}