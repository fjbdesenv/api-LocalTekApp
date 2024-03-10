import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateAtendimentoEventoDto {
    @IsNumber()
    @ApiProperty({ example: 1234 })
    codigo_atendimento: number;

    @IsNumber()
    @ApiProperty({ example: 1, required: true })
    readonly codigo_status: number;

    @IsString()
    @ApiProperty({ example: 'Entrega', required: true })
    readonly descricao: string;

    @IsDateString()
    @ApiProperty({ example: '2024-01-01', required: true })
    readonly data: Date; /* Formato YYYY-MM-DD */
}
