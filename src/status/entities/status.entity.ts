import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Status {

  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  codigo: number;

  @Column({ length: 50 })
  @ApiProperty({ example: "Descrição do status", required: true })
  descricao: string;

  @Column()
  @ApiProperty({  example: 1 })
  tipo: number;

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  @ApiProperty({  example: "2024-01-04T13:38:56.000Z" })
  data_criacao: Date;
	
  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  @ApiProperty({  example: "2024-01-04T13:38:56.000Z" })
  data_atualizacao: Date;
}
