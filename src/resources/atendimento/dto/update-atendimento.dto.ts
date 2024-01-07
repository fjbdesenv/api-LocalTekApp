import { PartialType } from '@nestjs/swagger';
import { CreateAtendimentoDto } from './create-atendimento.dto';

export class UpdateAtendimentoDto extends PartialType(CreateAtendimentoDto) {}
