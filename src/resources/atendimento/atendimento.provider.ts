import { DataSource } from 'typeorm';
import { Atendimento } from './entities/atendimento.entity';

export const atendimentoProviders = [
  {
    provide: 'ATENDIMENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Atendimento),
    inject: ['DATA_SOURCE'],
  },
];