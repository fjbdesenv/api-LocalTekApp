import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from 'src/class/DefaultEntity';
import { Status } from 'src/resources/status/entities/status.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Cnab extends DefaultEntity {
  @Column()
  @ApiProperty({ example: 1, default: 1, required: true })
  codigo_status: number;

  @Column({ default: 0 })
  @ApiProperty({ example: 240, required: true })
  quantidade_linhas: number;

  @Column({ length: 50 })
  @ApiProperty({ example: 'CNAB 240', required: true })
  descricao: string;

  /* Chaves estrangeiras */
  @ManyToOne((type) => Status)
  @JoinColumn({
    name: 'codigo_status',
    foreignKeyConstraintName: 'fk_cnab_status',
  })
  status: Status;
}
