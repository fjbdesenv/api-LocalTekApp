import { ApiProperty } from "@nestjs/swagger";
import { Status } from "src/status/entities/status.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Usuario {

  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  codigo: number;


  @Column({ length: 100 })
  @ApiProperty({ example: 'Nome do usuário', required: true })
  nome: string;

  
  @Column()
  codigo_status: number;

  @ManyToOne(type => Status)
  @JoinColumn({ name: 'codigo_status', foreignKeyConstraintName: 'fk_usuaio_status' })
  @ApiProperty({ example: 10, default: 1 })
  status: Status;

  @CreateDateColumn()
  @ApiProperty({  example: "2024-01-04T13:38:56.000Z" })
  data_criacao: Date;
	
  @UpdateDateColumn()
  @ApiProperty({  example: "2024-01-04T13:38:56.000Z" })
  data_atualizacao: Date;

}
