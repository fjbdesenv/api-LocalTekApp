import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateBancoDto {
  @IsNumber()
  @ApiProperty({ example: 1, required: true })
  readonly codigo_status: number;

  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 756, required: true })
  readonly codigo_banco: number;

  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 756, required: true })
  readonly codigo_camara: number;

  @IsString()
  @ApiProperty({ example: 'Sicoob', maxLength: 50, required: true })
  nome: string;
}
