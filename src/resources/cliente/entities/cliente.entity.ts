import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from 'src/class/DefaultEntity';
import { Status } from 'src/resources/status/entities/status.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Cliente extends DefaultEntity {
  @Column()
  @ApiProperty({ example: 1 })
  codigo_status: number;

  @Column({ unique: true })
  @ApiProperty({ example: 1000, minimum: 1 })
  codigo_cliente_tek: number;

  @Column({ length: 100 })
  @ApiProperty({ example: 'razao', required: true })
  razao: string;

  @Column({ length: 100 })
  @ApiProperty({ example: 'nome fantasia', required: true })
  nome_fantasia: String;

  @Column({ length: 100, unique: true })
  @ApiProperty({ example: 'cliente@email.com', required: true })
  email: string;

  @Column({ type: 'tinyint', default: 2, comment: '1 - CPF | 2 - CNPJ' })
  @ApiProperty({ example: 2, default: 2, required: true })
  tipo: number;

  @Column({ length: 18, unique: true })
  @ApiProperty({ example: '000.000.000-00 ou 00.000.000/0000-00', required: true })
  cnpj_cpf: string;

  /* Chaves estrangeiras */
  @ManyToOne((type) => Status)
  @JoinColumn({
    name: 'codigo_status',
    foreignKeyConstraintName: 'fk_cliente_status',
  })
  status: Status;
}
