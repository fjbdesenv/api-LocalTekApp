import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateCnabDto {
  @IsNumber()
  @ApiProperty({ example: 1, required: true })
  readonly codigo_status: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 240, required: true })
  readonly quantidade_linhas: number;

  @IsString()
  @ApiProperty({ example: 'CNAB 240', maxLength: 50, required: true })
  readonly descricao: string;
}
