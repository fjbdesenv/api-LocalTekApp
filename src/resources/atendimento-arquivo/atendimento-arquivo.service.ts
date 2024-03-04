import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AtendimentoArquivo } from './entities/atendimento-arquivo.entity';
import { ErroSystem } from 'src/class/Erro';
import { DeleteResult, Repository } from 'typeorm';
import { Atendimento } from '../atendimento/entities/atendimento.entity';
import { rmSync } from 'fs';

@Injectable()
export class AtendimentoArquivoService {
  private atendimentoArquivo: AtendimentoArquivo;
  private atendimento: Atendimento;
  private error: ErroSystem;

  constructor(
    @Inject('ATENDIMENTO_ARQUIVO_REPOSITORY') private atendimentoArquivoRepository: Repository<AtendimentoArquivo>,
    @Inject('ATENDIMENTO_REPOSITORY') private atendimentoRepository: Repository<Atendimento>,
  ) {
    this.atendimentoArquivo = undefined;
    this.error = new ErroSystem();
  }

  async create(arquivoDto: AtendimentoArquivo): Promise<AtendimentoArquivo> {
    try {
      const { codigo_atendimento } = arquivoDto;
      this.atendimento = await this.atendimentoRepository.findOneBy({ codigo: codigo_atendimento });

      /* verifica se atendimento existe */
      if (this.atendimento) {
        arquivoDto.setArquivo();
        return await this.atendimentoArquivoRepository.save(arquivoDto);
      }

      return this.atendimentoArquivo;
    } catch (error) {
      if (error.statusCode !== 500) return;
      this.error.erro500(error.message);
    }
  }

  async findAll(codigoAtendimento: number): Promise<Array<AtendimentoArquivo>> {
    try {
      const retorno = await this.atendimentoArquivoRepository.find({ where: { codigo_atendimento: codigoAtendimento } });

      retorno.map(atenArq => {
        atenArq.url = undefined;
        return atenArq;
      });

      return retorno;
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findByCodigo(codigoAtendimento: number, codigo: number): Promise<AtendimentoArquivo> {
    try {
      this.atendimentoArquivo = await this.atendimentoArquivoRepository.findOneBy({ codigo, codigo_atendimento: codigoAtendimento });
      if (this.atendimentoArquivo) this.atendimentoArquivo.url = undefined;
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.atendimentoArquivo) {
      throw new NotFoundException();
    } else {
      return this.atendimentoArquivo;
    }
  }

  async update(arquivoDto: AtendimentoArquivo): Promise<AtendimentoArquivo> {
    try {
      const { codigo, codigo_atendimento } = arquivoDto;
      const where = { codigo, codigo_atendimento };
      const atendimentoArquivoAntigo = await this.atendimentoArquivoRepository.findOneBy(where);

      if (atendimentoArquivoAntigo) {
        const urlAntiga = atendimentoArquivoAntigo.url;

        /* Adiciona dados do arquivo */
        arquivoDto.setArquivo();
        arquivoDto = Object.assign(atendimentoArquivoAntigo, arquivoDto);

        const retorno = await this.atendimentoArquivoRepository.update({ codigo }, arquivoDto);

        if (retorno.affected > 0) {
          /* Apaga arquivo antigo */
          rmSync(urlAntiga);

          this.atendimentoArquivo = await this.atendimentoArquivoRepository.findOneBy(where);
          this.atendimentoArquivo.url = undefined;
        }
      } else {
        /* Apaga arquivo que seria salvo */
        rmSync(arquivoDto.arquivo.path);
        this.atendimentoArquivo = undefined;
      }

      return this.atendimentoArquivo;

    } catch (error) {
      if (error.statusCode !== 500) return;
      this.error.erro500(error.message);
    }

    if (!this.atendimentoArquivo) {
      throw new NotFoundException();
    } else {
      return this.atendimentoArquivo;
    }
  }

  async remove(codigoAtendimento: number, codigo: number): Promise<string> {
    try {
      this.atendimentoArquivo = await this.atendimentoArquivoRepository.findOne({ where: { codigo, codigo_atendimento: codigoAtendimento } });

      if (this.atendimentoArquivo) {
        const retono: DeleteResult = await this.atendimentoArquivoRepository.delete({ codigo, codigo_atendimento: codigoAtendimento });
        if (retono.affected > 0) rmSync(this.atendimentoArquivo.url); /* Apaga arquivo antigo */
      } else {
        this.atendimentoArquivo = undefined;
      }
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.atendimentoArquivo) {
      throw new NotFoundException();
    } else {
      return `Resgistro de código ${codigo} removido.`;
    }
  }
}
