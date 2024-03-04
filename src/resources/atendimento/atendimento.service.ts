import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';
import { Atendimento } from './entities/atendimento.entity';
import { ErroSystem } from 'src/class/Erro';
import { configMulter } from 'src/config';
import { rmSync } from 'fs';


const relations = ['status', 'cliente'];

@Injectable()
export class AtendimentoService {
  private atendimento: Atendimento;
  private error: ErroSystem;

  constructor(
    @Inject('ATENDIMENTO_REPOSITORY')
    private atendimentoRepository: Repository<Atendimento>,
  ) {
    this.atendimento = undefined;
    this.error = new ErroSystem();
  }

  async create(
    createAtendimentoDto: CreateAtendimentoDto,
  ): Promise<Atendimento> {
    try {
      return await this.atendimentoRepository.save(createAtendimentoDto);
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findAll(): Promise<Array<Atendimento>> {
    try {
      return await this.atendimentoRepository.find({ relations });
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findByCodigo(codigo: number): Promise<Atendimento> {
    try {
      this.atendimento = await this.atendimentoRepository.findOneBy({ codigo });
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.atendimento) {
      throw new NotFoundException();
    } else {
      return this.atendimento;
    }
  }

  async update(
    codigo: number,
    updateAtendimentoDto: UpdateAtendimentoDto,
  ): Promise<Atendimento> {
    try {
      this.atendimento = await this.atendimentoRepository.findOneBy({ codigo });

      if (this.atendimento) {
        this.atendimento = Object.assign(
          this.atendimento,
          updateAtendimentoDto,
        );

        await this.atendimentoRepository.update(
          { codigo },
          updateAtendimentoDto,
        );
      }
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.atendimento) {
      throw new NotFoundException();
    } else {
      return this.atendimento;
    }
  }

  async remove(codigo: number): Promise<string> {
    try {
      const result: DeleteResult = await this.atendimentoRepository.delete({codigo});

      if (result.affected > 0) {
        /* Apaga a pasta de arquivos do atendimento */
        const { dynamicPath } = configMulter;
        const pathAux = dynamicPath(codigo);
        if (pathAux) rmSync(pathAux, { recursive: true, force: true });

        this.atendimento = new Atendimento();
      } else {
        this.atendimento = undefined;
      }
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.atendimento) {
      throw new NotFoundException();
    } else {
      return `Resgistro de código ${codigo} removido.`;
    }
  }
}
