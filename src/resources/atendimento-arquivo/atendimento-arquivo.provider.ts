import { DataSource } from 'typeorm';
import { AtendimentoArquivo } from './entities/atendimento-arquivo.entity';

export const atendimentoArquivoProvider = [
  {
    provide: 'ATENDIMENTO_ARQUIVO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AtendimentoArquivo),
    inject: ['DATA_SOURCE'],
  },
];
