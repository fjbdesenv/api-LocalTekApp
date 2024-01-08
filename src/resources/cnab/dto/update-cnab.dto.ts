import { PartialType } from '@nestjs/swagger';
import { CreateCnabDto } from './create-cnab.dto';

export class UpdateCnabDto extends PartialType(CreateCnabDto) {}
