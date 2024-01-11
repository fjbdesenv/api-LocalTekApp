import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from 'src/class/DefaultEntity';
import { Atendimento } from 'src/resources/atendimento/entities/atendimento.entity';
import { Banco } from 'src/resources/banco/entities/banco.entity';
import { Cnab } from 'src/resources/cnab/entities/cnab.entity';
import { Status } from 'src/resources/status/entities/status.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class ConfRemessa extends DefaultEntity {
  @Column()
  @ApiProperty({ example: 1, required: true })
  codigo_status: number;

  @Column()
  @ApiProperty({ example: 1, required: true })
  codigo_banco: number;

  @Column()
  @ApiProperty({ example: 1, required: true })
  codigo_atendimento: number;

  @Column()
  @ApiProperty({ example: 1, required: true })
  codigo_cnab: number;

  @Column({ comment: '1 - pagamento | 2 - cobrança' })
  @ApiProperty({ example: 1, required: true })
  tipo_remessa: number;

  @Column()
  @ApiProperty({ example: 1000, required: true })
  agencia: number;

  @Column({ type: 'tinyint' })
  @ApiProperty({ example: 8, required: true })
  digito_agencia: number;

  @Column()
  @ApiProperty({ example: 90876, required: true })
  conta_corrente: number;

  @Column({ type: 'tinyint' })
  @ApiProperty({ example: 4, required: true })
  digito_conta_corrente: number;

  @Column({ length: 50 })
  @ApiProperty({ example: '01', default: '' })
  carteira: string;

  @Column({ length: 50 })
  @ApiProperty({ example: '09', default: '' })
  variacao: string;

  @Column({ length: 50 })
  @ApiProperty({ example: '89478475', default: '' })
  convenio: string;

  @Column({ length: 50 })
  @ApiProperty({ example: '', default: '' })
  cedente: string;

  @Column({ length: 50 })
  @ApiProperty({ example: '', default: '' })
  contrato: string;

  @Column({ length: 100 })
  @ApiProperty({ example: 'titular da conta', required: true })
  titular: string;

  @Column({ length: 14 })
  @ApiProperty({ example: '12345678909876', maxLength: 14, required: true })
  titular_cnpj_cpf: string;

  @Column({ length: 100 })
  @ApiProperty({ example: 'sacador da conta' })
  sacador_avalista: string;

  @Column({ length: 14 })
  @ApiProperty({ example: '98765432123456', maxLength: 14, required: true })
  sacador_avalista_cnpj_cpf: string;

  @Column({ type: 'float', precision: 2 })
  @ApiProperty({ example: 0.5, default: 0, required: true })
  juros: number;

  @Column({ type: 'float', precision: 2 })
  @ApiProperty({ example: 0.75, default: 0, required: true })
  multa: number;

  @Column({ type: 'boolean' })
  @ApiProperty({
    example: false,
    description: '0 - Sem protesto | 1 - Com protesto',
    required: true,
  })
  protesto: boolean;

  @Column()
  @ApiProperty({ example: 0, required: true })
  protesto_dias: number;

  @Column({ type: 'boolean' })
  @ApiProperty({
    example: false,
    description: '0 - Sem pix | 1 - Com pix',
    required: true,
  })
  pix: boolean;

  @Column({ type: 'tinyint' })
  @ApiProperty({
    example: 0,
    description: '1 - Empresa | 2 - Banco',
    required: true,
  })
  emitente: number;

  /* Chaves estrangeiras */
  @ManyToOne((type) => Status)
  @JoinColumn({
    name: 'codigo_status',
    foreignKeyConstraintName: 'fk_conf_remessa_status',
  })
  status: Status;

  @ManyToOne((type) => Banco)
  @JoinColumn({
    name: 'codigo_banco',
    foreignKeyConstraintName: 'fk_conf_remessa_banco',
  })
  banco: Banco;

  @ManyToOne((type) => Atendimento)
  @JoinColumn({
    name: 'codigo_atendimento',
    foreignKeyConstraintName: 'fk_conf_remessa_atendimento',
  })
  atendimento: Atendimento;

  @ManyToOne((type) => Cnab)
  @JoinColumn({
    name: 'codigo_cnab',
    foreignKeyConstraintName: 'fk_conf_remessa_cnab',
  })
  cnab: Cnab;
}
