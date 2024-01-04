import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ length: 50, comment: 'Teste' })
  descricao: string;

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  data_criacao: Date
	
  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  data_atualizacao: Date
}
