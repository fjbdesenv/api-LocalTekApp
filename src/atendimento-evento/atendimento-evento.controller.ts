import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AtendimentoEventoService } from './atendimento-evento.service';
import { CreateAtendimentoEventoDto } from './dto/create-atendimento-evento.dto';
import { UpdateAtendimentoEventoDto } from './dto/update-atendimento-evento.dto';

@Controller('atendimento-evento')
export class AtendimentoEventoController {
  constructor(private readonly atendimentoEventoService: AtendimentoEventoService) {}

  @Post()
  create(@Body() createAtendimentoEventoDto: CreateAtendimentoEventoDto) {
    return this.atendimentoEventoService.create(createAtendimentoEventoDto);
  }

  @Get()
  findAll() {
    return this.atendimentoEventoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atendimentoEventoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtendimentoEventoDto: UpdateAtendimentoEventoDto) {
    return this.atendimentoEventoService.update(+id, updateAtendimentoEventoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atendimentoEventoService.remove(+id);
  }
}
