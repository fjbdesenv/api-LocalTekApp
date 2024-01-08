import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class DefaultEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  codigo: number;

  @CreateDateColumn() /* Atualiza a data de criação automaticamente */
  @ApiProperty({ example: '2024-01-04T13:38:56.000Z' })
  data_criacao: Date;

  @UpdateDateColumn() /* Atualiza a data de atualização automaticamente */
  @ApiProperty({ example: '2024-01-04T13:38:56.000Z' })
  data_atualizacao: Date;
}
