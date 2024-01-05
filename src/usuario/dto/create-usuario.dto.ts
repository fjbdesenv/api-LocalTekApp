import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateUsuarioDto {

  @IsString()
  @ApiProperty({ example: "Nome do usuário", required: true })
  readonly nome: string;

  @IsNumber()
  @ApiProperty({ example: 10, default: 1, required: true })
  codigo_status: number;
}
