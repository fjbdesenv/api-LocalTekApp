import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateRemessaFinanceiraDto {
  @IsNumber()
  @ApiProperty({ example: 1, required: true })
  codigo_banco: number;

  @IsNumber()
  @ApiProperty({ example: 1, required: true })
  codigo_atendimento: number;

  @IsNumber()
  @ApiProperty({ example: 1, required: true })
  codigo_cnab: number;

  @IsNumber()
  @ApiProperty({ example: 1, required: true })
  codigo_status: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: '1 - pagamento | 2 - cobrança',
    required: true,
  })
  tipo_remessa: number;

  @IsNumber()
  @ApiProperty({ example: 1000, required: true })
  agencia: number;

  @IsNumber()
  @Min(0)
  @Max(9)
  @ApiProperty({ example: 8, required: true })
  digito_agencia: number;

  @IsNumber()
  @ApiProperty({ example: 90876, required: true })
  conta_corrente: number;

  @IsNumber()
  @Min(0)
  @Max(9)
  @ApiProperty({ example: 4, required: true })
  digito_conta_corrente: number;

  @IsString()
  @ApiProperty({ example: '01', default: '' })
  carteira: string;

  @IsString()
  @ApiProperty({ example: '09', default: '' })
  variacao: string;

  @IsString()
  @ApiProperty({ example: '89478475', default: '' })
  convenio: string;

  @IsString()
  @ApiProperty({ example: '', default: '' })
  cedente: string;

  @IsString()
  @ApiProperty({ example: '', default: '' })
  contrato: string;

  @IsString()
  @ApiProperty({ example: 'titular da conta', required: true })
  titular: string;

  @IsNumber()
  @ApiProperty({ example: 63271907000105, required: true })
  titular_cnpj_cpf: number;

  @IsString()
  @ApiProperty({ example: 'sacador da conta' })
  sacador_avalista: string;

  @IsNumber()
  @ApiProperty({ example: 34646100000101, required: true })
  sacador_avalista_cnpj_cpf: number;

  @IsNumber()
  @ApiProperty({ example: 0.5, default: 0, required: true })
  juros: number;

  @IsNumber()
  @ApiProperty({ example: 0.75, default: 0, required: true })
  multa: number;

  @IsBoolean()
  @ApiProperty({
    example: false,
    description: '0 - Sem protesto | 1 - Com protesto',
    required: true,
  })
  protesto: boolean;

  @IsNumber()
  @ApiProperty({ example: 0, required: true })
  protesto_dias: number;

  @IsBoolean()
  @ApiProperty({
    example: false,
    description: '0 - Sem pix | 1 - Com pix',
    required: true,
  })
  pix: boolean;

  @IsNumber()
  @ApiProperty({
    example: 0,
    description: '1 - Empresa | 2 - Banco',
    required: true,
  })
  emitente: number;
}
