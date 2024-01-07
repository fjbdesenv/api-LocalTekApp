import { DataSource } from 'typeorm';
import { Banco } from './entities/banco.entity';

export const bancoProvider = [
  {
    provide: 'BANCO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Banco),
    inject: ['DATA_SOURCE'],
  },
];