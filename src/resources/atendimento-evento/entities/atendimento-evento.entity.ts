import { ApiProperty } from "@nestjs/swagger";
import { DefaultEntity } from "src/class/DefaultEntity";
import { Atendimento } from "src/resources/atendimento/entities/atendimento.entity";
import { Status } from "src/resources/status/entities/status.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class AtendimentoEvento extends DefaultEntity {
    @Column()
    @ApiProperty({ example: 1234, required: true })
    codigo_atendimento: number;

    @Column()
    @ApiProperty({ example: 1, default: 1, required: true })
    codigo_status: number;

    @Column({ length: 100 })
    @ApiProperty({ example: 'Entrega', required: true })
    descricao: string;

    @Column({ type: 'date', comment: 'formato YYYY-MM-DD' })
    @ApiProperty({ example: '01/01/2024', required: true })
    data: Date;

    /* Chaves estrangeiras */

    @ManyToOne((type) => Status)
    @JoinColumn({
        name: 'codigo_status',
        foreignKeyConstraintName: 'fk_atendimentoEvento_status',
    })
    status: Status;

    /* Os eventos são deletados com o usuário */
    @ManyToOne((type) => Atendimento, atendimento => atendimento.codigo, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'codigo_atendimento',
        foreignKeyConstraintName: 'fk_atendimentoEvento_Atendimento',
    })
    atendimento: Atendimento;
}
