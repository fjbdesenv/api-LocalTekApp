import { ApiProperty } from "@nestjs/swagger";
import { DefaultEntity } from "src/class/DefaultEntity";
import { Atendimento } from "src/resources/atendimento/entities/atendimento.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class AtendimentoArquivo extends DefaultEntity {
    @Column()
    @ApiProperty({ example: 1234, required: true })
    codigo_atendimento: number;

    @Column({ length: 100 })
    @ApiProperty({ example: 'Entrega', required: true })
    nome: string;

    @Column({ length: 10 })
    @ApiProperty({ example: 'txt', required: true })
    extensao: string;

    @Column({
        type: 'mediumblob',
        comment: 'Binario',
        transformer: {
            /* Converto o Buffer do blob*/
            to: (value: string) => Buffer.from(value),
            from: (value: Buffer) => value.toString()
        }
    })
    @ApiProperty({ example: '001010101010100101010101', required: true })
    arquivo: string;

    /* Chaves estrangeiras */
    /* Os arquivos são deletados com o usuário */
    @ManyToOne((type) => Atendimento, atendimento => atendimento.codigo, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'codigo_atendimento',
        foreignKeyConstraintName: 'fk_atendimentoArquivo_Atendimento',
    })
    atendimento: Atendimento;

}
