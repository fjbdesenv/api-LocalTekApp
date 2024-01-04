import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateStatusDto {
  @IsString()
  @ApiProperty({ example: "Descrição", required: true })
  readonly descricao;
}

