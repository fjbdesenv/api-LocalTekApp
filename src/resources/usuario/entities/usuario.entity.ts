import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from 'src/class/DefaultEntity';
import { Status } from 'src/resources/status/entities/status.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Usuario extends DefaultEntity {
  @Column()
  @ApiProperty({ example: 1, required: true })
  codigo_status: number;

  @Column({ length: 100 })
  @ApiProperty({ example: 'João da silva teste', required: true })
  nome: string;

  @Column({ length: 100, unique: true })
  @ApiProperty({ example: 'email@email.com', required: true })
  email: string;

  @Column({ length: 100 })
  @ApiProperty({ example: 'senha', required: true })
  senha: string;

  @Column({
    type: 'tinyint',
    comment: '1 - Cliente | 2 - Usuário | 3 - Administrador',
  })
  @ApiProperty({ example: 1, required: true })
  nivel: number;

  /* Chaves estrangeiras */
  @ManyToOne((type) => Status)
  @JoinColumn({
    name: 'codigo_status',
    foreignKeyConstraintName: 'fk_usuaio_status',
  })
  status: Status;
}
