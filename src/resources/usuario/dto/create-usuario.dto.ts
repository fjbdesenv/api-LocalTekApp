import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { nivel } from 'src/enum/niveis';

export class CreateUsuarioDto {
  @IsNumber()
  @ApiProperty({ example: 1, default: 1, required: true })
  readonly codigo_status: number;

  @IsString()
  @ApiProperty({ example: 'João da silva teste', required: true })
  readonly nome: string;

  @IsEmail()
  @ApiProperty({ example: 'email@email.com', required: true })
  readonly email: string;

  @IsString()
  @ApiProperty({ example: 'senha', required: true })
  senha: string;

  @IsString()
  @ApiProperty({ example: "Administrador|Especificidade|Remesssa", default: "" })
  modulos: string;

  @IsNumber()
  @ApiProperty({ example: 2, default: 2 })
  nivel: number;

}
