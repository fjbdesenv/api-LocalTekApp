import { DataSource } from 'typeorm';
import { AtendimentoEvento } from './entities/atendimento-evento.entity';

export const atendimentoEventoProvider = [
  {
    provide: 'ATENDIMENTO_EVENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AtendimentoEvento),
    inject: ['DATA_SOURCE'],
  },
];
