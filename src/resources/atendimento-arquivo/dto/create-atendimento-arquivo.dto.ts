import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateAtendimentoArquivoDto {
    @IsNumber()
    @ApiProperty({ example: 1234 })
    codigo_atendimento: number;

    @IsString()
    @ApiProperty({ example: 'arquivo.txt', maxLength: 100, required: true })
    readonly nome: string;

    @IsString()
    @ApiProperty({ example: 'txt', maxLength: 10, required: true })
    readonly extensao: string;

    @IsString()
    @ApiProperty({ example: '001010101010100101010101', required: true })
    readonly arquivo: string;
}
