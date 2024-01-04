import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateStatusDto {
  @IsString()
  @ApiProperty({ example: "Descrição", required: true })
  readonly descricao;
}
