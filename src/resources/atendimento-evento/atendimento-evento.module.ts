import { Module } from '@nestjs/common';
import { AtendimentoEventoService } from './atendimento-evento.service';
import { AtendimentoEventoController } from './atendimento-evento.controller';
import { DatabaseModule } from 'src/dataBase/dados.module';
import { atendimentoEventoProvider } from './atendimento-evento.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [AtendimentoEventoController],
  providers: [AtendimentoEventoService, ...atendimentoEventoProvider],
})
export class AtendimentoEventoModule { }
