import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from 'src/class/DefaultEntity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Status extends DefaultEntity {
  @Column({ length: 50 })
  @ApiProperty({ example: 'Descrição do status', required: true })
  descricao: string;

  @Column()
  @ApiProperty({ example: 1 })
  tipo: number;
}
