import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  MaxLength
} from 'class-validator';

export class CreateClienteDto {
  @IsNumber()
  @ApiProperty({ example: 1, default: 1, required: true })
  readonly codigo_status: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 1000, required: true })
  readonly codigo_cliente_tek: number;

  @IsString()
  @MaxLength(100)
  @ApiProperty({ example: 'razão social', required: true })
  readonly razao: string;

  @IsString()
  @MaxLength(100)
  @ApiProperty({ example: 'nome fantasia', required: true })
  readonly nome_fantasia: string;

  @IsEmail()
  @MaxLength(100)
  @ApiProperty({ example: 'cliente@email.com', required: true })
  readonly email: string;

  @IsString()
  @Length(18, 18)
  @ApiProperty({ example: '00.000.000/0000-00', required: true })
  readonly cnpj_cpf: string;
}
