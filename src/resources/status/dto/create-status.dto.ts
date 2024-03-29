import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateStatusDto {
  @IsString()
  @ApiProperty({ example: 'Descrição do status', required: true })
  readonly descricao: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 1, required: true })
  readonly tipo: number;
}
