import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @ApiProperty({ example: 'email@email.com', required: true })
  readonly email: string;

  @IsString()
  @ApiProperty({ example: 'senhaAlterar', required: true })
  readonly senha: string;
}
