import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateAtendimentoEventoDto {
    @IsNumber()
    @ApiProperty({ example: 1234 })
    codigo_atendimento: number;

    @IsNumber()
    @ApiProperty({ example: 1, required: true })
    readonly codigo_status: number;

    @IsString()
    @ApiProperty({ example: 'Entrega', maxLength: 100, required: true })
    readonly descricao: string;

    @IsString()
    @ApiProperty({ example: '01/01/2024', required: true })
    readonly data: string;
}
