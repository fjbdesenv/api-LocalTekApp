import { PartialType } from '@nestjs/swagger';
import { CreateAtendimentoArquivoDto } from './create-atendimento-arquivo.dto';

export class UpdateAtendimentoArquivoDto extends PartialType(CreateAtendimentoArquivoDto) { }
