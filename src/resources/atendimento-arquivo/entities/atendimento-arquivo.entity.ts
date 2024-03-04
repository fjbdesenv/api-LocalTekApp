import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsObject } from "class-validator";
import { DefaultEntity } from "src/class/DefaultEntity";
import { Atendimento } from "src/resources/atendimento/entities/atendimento.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class AtendimentoArquivo extends DefaultEntity {

    constructor(codigo_atendimento: number = undefined, arquivo: Express.Multer.File = undefined) {
        super();

        this.codigo_atendimento = codigo_atendimento;
        this.arquivo = arquivo;
    }

    setArquivo() {
        if (this.arquivo) {
            this.nome = this.arquivo.originalname;
            this.tamanho = this.arquivo.size;
            this.tipo = this.arquivo.mimetype;
            this.url = this.arquivo.path;

            this.arquivo = undefined;
        }
    }

    @Column()
    @IsNumber()
    @ApiProperty({ example: 1234, required: true })
    codigo_atendimento: number;

    @Column({ length: 100 })
    @ApiProperty({ example: 'imagem1.png', required: true })
    nome: string;

    @Column({ length: 50 })
    @ApiProperty({ example: 'image/png', required: true })
    tipo: string;

    @Column()
    @ApiProperty({ example: 4096, required: true })
    tamanho: number;

    @Column({ nullable: false })
    url: string;

    @IsObject()
    arquivo: Express.Multer.File;

    /* Chaves estrangeiras */
    /* Os arquivos são deletados com o usuário */
    @ManyToOne((type) => Atendimento, atendimento => atendimento.codigo, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'codigo_atendimento',
        foreignKeyConstraintName: 'fk_atendimentoArquivo_Atendimento',
    })
    atendimento: Atendimento;

}
