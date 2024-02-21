import { ApiProperty } from "@nestjs/swagger";
import { DefaultEntity } from "src/class/DefaultEntity";
import { Atendimento } from "src/resources/atendimento/entities/atendimento.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class AtendimentoEvento extends DefaultEntity {
    @Column()
    @ApiProperty({ example: 1234, required: true })
    codigo_atendimento: number;

    @Column({ length: 100 })
    @ApiProperty({ example: 'Entrega', required: true })
    descricao: string;

    @Column()
    @ApiProperty({ example: '01/01/2024', required: true })
    data: string;

    /* Chaves estrangeiras */
    @ManyToOne((type) => Atendimento)
    @JoinColumn({
        name: 'codigo_atendimento',
        foreignKeyConstraintName: 'fk_atendimentoEvento_Atendimento',
    })
    atendimento: Atendimento;
}
