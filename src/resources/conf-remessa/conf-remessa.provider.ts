import { DataSource } from 'typeorm';
import { ConfRemessa } from './entities/conf-remessa.entity';

export const ConfRemessaProvider = [
  {
    provide: 'CONF_REMESSA_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ConfRemessa),
    inject: ['DATA_SOURCE'],
  },
];
