import { ApiProperty } from "@nestjs/swagger";
import { DefaultEntity } from "src/class/DefaultEntity";
import { Status } from "src/resources/status/entities/status.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Banco extends DefaultEntity {

    @Column()
    @ApiProperty({ example: 1, default: 1,  required: true })
    codigo_status: number;
    
    @Column({ default: 0, unique: true })
    @ApiProperty({ example: 756, required: true })
    codigo_banco: number;
    
    @Column({ default: 0, unique: true })
    @ApiProperty({ example: 756, required: true })
    codigo_camara: number;
    
    @Column({ length: 50 })
    @ApiProperty({ example: 'Sicoob', required: true })
    nome: string;

    /* Chaves estrangeiras */
    @ManyToOne(type => Status)
    @JoinColumn({ name: 'codigo_status', foreignKeyConstraintName: 'fk_banco_status' })
    status: Status;

}
