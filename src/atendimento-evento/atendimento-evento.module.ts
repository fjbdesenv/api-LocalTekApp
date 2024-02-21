import { Module } from '@nestjs/common';
import { AtendimentoEventoService } from './atendimento-evento.service';
import { AtendimentoEventoController } from './atendimento-evento.controller';

@Module({
  controllers: [AtendimentoEventoController],
  providers: [AtendimentoEventoService],
})
export class AtendimentoEventoModule {}
