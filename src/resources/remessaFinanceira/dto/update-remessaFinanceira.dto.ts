import { PartialType } from '@nestjs/swagger';
import { CreateRemessaFinanceiraDto } from './create-remessaFinanceira.dto';

export class UpdateRemessaFinanceiraDto extends PartialType(CreateRemessaFinanceiraDto) {}
