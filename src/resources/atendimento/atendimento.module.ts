import { Module } from '@nestjs/common';
import { AtendimentoService } from './atendimento.service';
import { AtendimentoController } from './atendimento.controller';
import { DatabaseModule } from 'src/dataBase/dados.module';
import { atendimentoProviders } from "./atendimento.provider"


@Module({
  imports: [DatabaseModule],
  controllers: [AtendimentoController],
  providers: [AtendimentoService, ...atendimentoProviders],
})
export class AtendimentoModule {}
