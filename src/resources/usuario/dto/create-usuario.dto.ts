import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, IsStrongPassword } from 'class-validator';

export class CreateUsuarioDto {
  @IsNumber()
  @ApiProperty({ example: 1, default: 1, required: true })
  codigo_status: number;

  @IsString()
  @ApiProperty({ example: 'João da silva teste', required: true })
  nome: string;

  //@IsString()
  @IsEmail()
  @ApiProperty({ example: 'email@email.com', required: true })
  email: string;

  @IsString()
  @ApiProperty({ example: 'senhaAlterar', required: true })
  senha: string;

  @IsNumber()
  @ApiProperty({ example: 1, required: true, default: 1 })
  nivel: number;
}
