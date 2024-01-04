import { DataSource } from 'typeorm';
import { Status } from './entities/status.entity';

export const statusProviders = [
  {
    provide: 'STATUS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Status),
    inject: ['DATA_SOURCE'],
  },
];