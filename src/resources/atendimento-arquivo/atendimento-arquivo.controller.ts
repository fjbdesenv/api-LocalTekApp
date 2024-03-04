import { Controller, Get, Post, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, NotFoundException, Body } from '@nestjs/common';
import { AtendimentoArquivoService } from './atendimento-arquivo.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AtendimentoArquivo } from './entities/atendimento-arquivo.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/configMulter';
import { CreateAtendimentoArquivoDto } from './dto/create-atendimento-arquivo.dto';

@ApiBearerAuth()
@ApiTags('Atendimento Arquivo')
@Controller('atendimentos/:codigoAtendimento/arquivos')
export class AtendimentoArquivoController {
  constructor(private readonly atendimentoArquivoService: AtendimentoArquivoService) { }

  @Post()
  @UseInterceptors(FileInterceptor('arquivo', multerConfig)) /* Faz upload de 1 arquivo */
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        arquivo: { // 👈 Arquivo
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Cadastrar um novo arquivo' })
  @ApiResponse({ status: 201, description: 'Created', type: AtendimentoArquivo })
  @ApiResponse({ status: 401, description: 'Unauthorized' })

  async uploadArquivo(
    @Param('codigoAtendimento') codigoAtendimento: string,
    @UploadedFile() arquivo: Express.Multer.File,
    @Res() response
  ) {

    if (arquivo) {
      const atendimentoArquivo = new AtendimentoArquivo(+codigoAtendimento, arquivo);
      const retorno = await this.atendimentoArquivoService.create(atendimentoArquivo);

      if (retorno) {
        retorno.url = undefined;
        response.status(201).json(retorno);
      } else {
        throw new NotFoundException();
      }

    } else {
      /* class-validator não pode ser usada, tratamento manual */
      return response.status(400).json({
        "message": [
          "arquivo must be a object"
        ],
        "error": "Bad Request",
        "statusCode": 400
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Consultar todos os arquivos de um atendimento' })
  @ApiResponse({ status: 200, description: 'OK', type: [AtendimentoArquivo] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@Param('codigoAtendimento') codigoAtendimento: string) {
    return this.atendimentoArquivoService.findAll(+codigoAtendimento);
  }

  @Get(':codigo')
  @ApiOperation({ summary: 'Consultar um arquivo de um atendimento' })
  @ApiResponse({ status: 200, description: 'OK', type: AtendimentoArquivo })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorize' })
  findOne(
    @Param('codigoAtendimento') codigoAtendimento: string,
    @Param('codigo') codigo: string
  ) {
    return this.atendimentoArquivoService.findByCodigo(+codigoAtendimento, +codigo);
  }

  @Patch(':codigo')
  @UseInterceptors(FileInterceptor('arquivo', multerConfig)) /* Faz upload de 1 arquivo */
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        arquivo: { // 👈 Arquivo
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Editar um arquivo um atendimento' })
  @ApiResponse({ status: 200, description: 'OK', type: AtendimentoArquivo })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateArquivo(
    @Param('codigoAtendimento') codigoAtendimento: string,
    @Param('codigo') codigo: string,
    @UploadedFile() arquivo: Express.Multer.File,
    @Res() response
  ) {
    if (arquivo) {
      const atendimentoArquivo = new AtendimentoArquivo(+codigoAtendimento, arquivo);
      atendimentoArquivo.codigo = +codigo;

      const retorno = await this.atendimentoArquivoService.update(atendimentoArquivo);

      if (retorno) {
        response.json(retorno);
      } else {
        throw new NotFoundException();
      }

    } else {
      /* class-validator não pode ser usada, tratamento manual */
      return response.status(400).json({
        "message": [
          "arquivo must be a object"
        ],
        "error": "Bad Request",
        "statusCode": 400
      });
    }
  }

  @Delete(':codigo')
  @ApiOperation({ summary: 'Deletar um arquivo um atendimento' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(
    @Param('codigoAtendimento') codigoAtendimento: string,
    @Param('codigo') codigo: string
  ) {
    return this.atendimentoArquivoService.remove(+codigoAtendimento, +codigo);
  }
}