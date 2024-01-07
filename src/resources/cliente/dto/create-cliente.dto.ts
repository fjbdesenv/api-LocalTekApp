import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, MaxLength } from "class-validator";

export class CreateClienteDto {

    @IsString()
    @MaxLength(100)
    @ApiProperty({ example: "razão social", required: true })
    razao: string;
    
    @IsString()
    @MaxLength(100)
    @ApiProperty({ example: "nome fantasia", required: true })
    nome_fantasia: string;
    
    @IsString()
    @Length(18, 18)
    @ApiProperty({ example: "00.000.000/0000-00", required: true })
    cnpj_cpf: string;

}
