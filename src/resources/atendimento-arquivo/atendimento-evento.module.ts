import { Module } from '@nestjs/common';
import { AtendimentoArquivoService } from './atendimento-arquivo.service';
import { AtendimentoArquivoController } from './atendimento-arquivo.controller';
import { DatabaseModule } from 'src/dataBase/dados.module';
import { atendimentoArquivoProvider } from './atendimento-arquivo.provider';
import { atendimentoProviders } from '../atendimento/atendimento.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [AtendimentoArquivoController],
  providers: [AtendimentoArquivoService, ...atendimentoArquivoProvider, ...atendimentoProviders],
})
export class AtendimentoArquivoModule { }
