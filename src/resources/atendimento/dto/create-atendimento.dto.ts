import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateAtendimentoDto {
  @IsNumber()
  @ApiProperty({ example: 1, default: 1, required: true })
  readonly codigo_status: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 123456, required: true })
  readonly codigo_atendimento_tek: number;

  @IsNumber()
  @ApiProperty({ example: 1, required: true })
  readonly codigo_cliente: number;
}
