import { ApiProperty } from "@nestjs/swagger";

export class CreateAtendimentoArquivoDto {
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    readonly arquivo: Express.Multer.File;
}
