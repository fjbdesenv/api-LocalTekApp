import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAtendimentoArquivoDto } from './dto/create-atendimento-arquivo.dto';
import { UpdateAtendimentoArquivoDto } from './dto/update-atendimento-arquivo.dto';
import { AtendimentoArquivo } from './entities/atendimento-arquivo.entity';
import { ErroSystem } from 'src/class/Erro';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class AtendimentoArquivoService {
  private atendimentoArquivo: AtendimentoArquivo;
  private error: ErroSystem;

  constructor(
    @Inject('ATENDIMENTO_ARQUIVO_REPOSITORY') private atendimentoArquivoRepository: Repository<AtendimentoArquivo>,
  ) {
    this.atendimentoArquivo = undefined;
    this.error = new ErroSystem();
  }

  async create(createAtendimentoArquivoDto: CreateAtendimentoArquivoDto): Promise<AtendimentoArquivo> {
    try {
      return await this.atendimentoArquivoRepository.save(createAtendimentoArquivoDto);
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findAll(codigoAtendimento: number): Promise<Array<AtendimentoArquivo>> {
    try {
      return await this.atendimentoArquivoRepository.find({ where: { codigo_atendimento: codigoAtendimento } });
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findByCodigo(codigoAtendimento: number, codigo: number): Promise<AtendimentoArquivo> {
    try {
      this.atendimentoArquivo = await this.atendimentoArquivoRepository.findOneBy({ codigo, codigo_atendimento: codigoAtendimento });
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.atendimentoArquivo) {
      throw new NotFoundException();
    } else {
      return this.atendimentoArquivo;
    }
  }

  async update(codigo: number, updateAtendimentoArquivoDto: UpdateAtendimentoArquivoDto): Promise<AtendimentoArquivo> {
    try {
      const { codigo_atendimento } = updateAtendimentoArquivoDto;
      this.atendimentoArquivo = await this.atendimentoArquivoRepository.findOneBy({ codigo, codigo_atendimento });

      if (this.atendimentoArquivo) {
        this.atendimentoArquivo = Object.assign(this.atendimentoArquivo, updateAtendimentoArquivoDto);

        await this.atendimentoArquivoRepository.update({ codigo }, updateAtendimentoArquivoDto);
      }
    } catch (error) {
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
      const result: DeleteResult = await this.atendimentoArquivoRepository.delete({ codigo, codigo_atendimento: codigoAtendimento });

      result.affected > 0 ? (this.atendimentoArquivo = new AtendimentoArquivo()) : (this.atendimentoArquivo = undefined);
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
