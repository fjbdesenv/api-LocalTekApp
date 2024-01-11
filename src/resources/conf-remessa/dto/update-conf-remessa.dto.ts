import { PartialType } from '@nestjs/swagger';
import { CreateConfRemessaDto } from './create-conf-remessa.dto';

export class UpdateConfRemessaDto extends PartialType(CreateConfRemessaDto) {}
