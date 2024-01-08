import { DataSource } from 'typeorm';
import { Cnab } from './entities/cnab.entity';

export const cnabProvider = [
  {
    provide: 'CNAB_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cnab),
    inject: ['DATA_SOURCE'],
  },
];
