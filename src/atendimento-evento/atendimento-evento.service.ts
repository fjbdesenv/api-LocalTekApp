import { Injectable } from '@nestjs/common';
import { CreateAtendimentoEventoDto } from './dto/create-atendimento-evento.dto';
import { UpdateAtendimentoEventoDto } from './dto/update-atendimento-evento.dto';

@Injectable()
export class AtendimentoEventoService {
  create(createAtendimentoEventoDto: CreateAtendimentoEventoDto) {
    return 'This action adds a new atendimentoEvento';
  }

  findAll() {
    return `This action returns all atendimentoEvento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} atendimentoEvento`;
  }

  update(id: number, updateAtendimentoEventoDto: UpdateAtendimentoEventoDto) {
    return `This action updates a #${id} atendimentoEvento`;
  }

  remove(id: number) {
    return `This action removes a #${id} atendimentoEvento`;
  }
}
