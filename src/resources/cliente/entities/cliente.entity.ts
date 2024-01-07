import { ApiProperty } from "@nestjs/swagger";
import { Status } from "src/resources/status/entities/status.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

const MIN_LENGTH = 18;
const MAX_LENGTH = 18;

@Entity()
export class Cliente {

    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    codigo: number;

    @Column()
    @ApiProperty({ example: 1 })
    codigo_status: number;

    @Column({ length: 100 })
    @ApiProperty({ example: "razao", required: true })
    razao: string;

    @Column({ length: 100 })
    @ApiProperty({ example: "nome fantasia", required: true })
    nome_fantasia: String;

    @Column({ length: 100 })
    @ApiProperty({ example: "cliente@email.com", required: true })
    email: string;

    @Column({ length: 18, unique: true })
    @ApiProperty({ example: "00.000.000/0000-00", required: true })
    cnpj_cpf: string;

    @CreateDateColumn() /* Atualiza a data de criação automaticamente */
    @ApiProperty({ example: "2024-01-04T13:38:56.000Z" })
    data_criacao: Date;

    @UpdateDateColumn() /* Atualiza a data de atualização automaticamente */
    @ApiProperty({ example: "2024-01-04T13:38:56.000Z" })
    data_atualizacao: Date;

    /* Chaves estrangeiras */
    @ManyToOne(type => Status)
    @JoinColumn({ name: 'codigo_status', foreignKeyConstraintName: 'fk_cliente_status' })
    status: Status;

}
