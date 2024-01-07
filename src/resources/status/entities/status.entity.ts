import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Status {

  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  codigo: number;

  @Column({ length: 50 })
  @ApiProperty({ example: "Descrição do status", required: true })
  descricao: string;

  @Column()
  @ApiProperty({ example: 1 })
  tipo: number;

  @CreateDateColumn() /* Atualiza a data de criação automaticamente */
  @ApiProperty({ example: "2024-01-04T13:38:56.000Z" })
  data_criacao: Date;

  @UpdateDateColumn() /* Atualiza a data de atualização automaticamente */
  @ApiProperty({ example: "2024-01-04T13:38:56.000Z" })
  data_atualizacao: Date;
}
