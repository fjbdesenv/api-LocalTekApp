import { ApiProperty } from "@nestjs/swagger";
import { Status } from "src/resources/status/entities/status.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Usuario {

  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  codigo: number;

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
  @ApiProperty({ example: 'senhaAlterar', required: true })
  senha: string;

  @Column({ type: 'tinyint', comment: '1 - Cliente | 2 - Usuário | 3 - Administrador' })
  @ApiProperty({ example: 1, required: true})
  nivel: number;

  @CreateDateColumn()
  @ApiProperty({  example: "2024-01-04T13:38:56.000Z" })
  data_criacao: Date;
	
  @UpdateDateColumn()
  @ApiProperty({  example: "2024-01-04T13:38:56.000Z" })
  data_atualizacao: Date;

  /* Chaves estrangeiras */
  @ManyToOne(type => Status)
  @JoinColumn({ name: 'codigo_status', foreignKeyConstraintName: 'fk_usuaio_status' })
  status: Status;

}
