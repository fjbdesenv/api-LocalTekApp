import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AtendimentoService } from './atendimento.service';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Atendimento } from './entities/atendimento.entity';

@ApiBearerAuth()
@ApiTags('Atendimento')
@Controller('atendimento')
export class AtendimentoController {
  constructor(private readonly atendimentoService: AtendimentoService) { }

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo atendimento' })
  @ApiResponse({ status: 201, description: 'Created', type: Atendimento })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createAtendimentoDto: CreateAtendimentoDto) {
    return this.atendimentoService.create(createAtendimentoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Consultar todos os atendimento' })
  @ApiResponse({ status: 200, description: 'OK', type: [Atendimento] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.atendimentoService.findAll();
  }

  @Get(':codigo')
  @ApiOperation({ summary: 'Consultar um atendimento' })
  @ApiResponse({ status: 200, description: 'OK', type: Atendimento })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorize' })
  findOne(@Param('codigo') codigo: string) {
    return this.atendimentoService.findByCodigo(+codigo);
  }

  @Patch(':codigo')
  @ApiOperation({ summary: 'Editar um atendimento' })
  @ApiResponse({ status: 200, description: 'OK', type: Atendimento })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(
    @Param('codigo') codigo: string,
    @Body() updateAtendimentoDto: UpdateAtendimentoDto,
  ) {
    return this.atendimentoService.update(+codigo, updateAtendimentoDto);
  }

  @Delete(':codigo')
  @ApiOperation({ summary: 'Deletar um atendimento' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('codigo') codigo: string) {
    return this.atendimentoService.remove(+codigo);
  }
}
