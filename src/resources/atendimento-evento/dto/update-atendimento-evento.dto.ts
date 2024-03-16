import { PartialType } from '@nestjs/swagger';
import { CreateAtendimentoEventoDto } from './create-atendimento-evento.dto';

export class UpdateAtendimentoEventoDto extends PartialType(CreateAtendimentoEventoDto) { }
