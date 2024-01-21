import { DataSource } from 'typeorm';
import { RemessaFinanceira } from './entities/remessaFinanceira.entity';

export const RemessaFinanceiraProvider = [
  {
    provide: 'REMESSA_FINANCEIRA_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RemessaFinanceira),
    inject: ['DATA_SOURCE'],
  },
];
