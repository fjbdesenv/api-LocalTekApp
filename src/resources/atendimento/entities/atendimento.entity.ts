import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from 'src/class/DefaultEntity';
import { Cliente } from 'src/resources/cliente/entities/cliente.entity';
import { Status } from 'src/resources/status/entities/status.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Atendimento extends DefaultEntity {
  @Column()
  @ApiProperty({ example: 1 })
  codigo_status: number;

  @Column()
  @ApiProperty({ example: 123456, required: true })
  codigo_atendimento_tek: number;

  @Column()
  @ApiProperty({ example: 1, required: true })
  codigo_cliente: number;

  /* Chaves estrangeiras */
  @ManyToOne((type) => Status)
  @JoinColumn({
    name: 'codigo_status',
    foreignKeyConstraintName: 'fk_atendimento_status',
  })
  status: Status;

  @ManyToOne((type) => Cliente)
  @JoinColumn({
    name: 'codigo_cliente',
    foreignKeyConstraintName: 'fk_atendimento_cliente',
  })
  cliente: Cliente;

}
