import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAtendimentoEventoDto } from './dto/create-atendimento-evento.dto';
import { UpdateAtendimentoEventoDto } from './dto/update-atendimento-evento.dto';
import { AtendimentoEvento } from './entities/atendimento-evento.entity';
import { ErroSystem } from 'src/class/Erro';
import { DeleteResult, Repository } from 'typeorm';

const relations = ['status'];

@Injectable()
export class AtendimentoEventoService {
  private atendimentoEvento: AtendimentoEvento;
  private error: ErroSystem;

  constructor(
    @Inject('ATENDIMENTO_EVENTO_REPOSITORY') private AtendimentoEventoRepository: Repository<AtendimentoEvento>,
  ) {
    this.atendimentoEvento = undefined;
    this.error = new ErroSystem();
  }

  async create(createAtendimentoEventoDto: CreateAtendimentoEventoDto): Promise<AtendimentoEvento> {
    try {
      return await this.AtendimentoEventoRepository.save(createAtendimentoEventoDto);
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findAll(codigoAtendimento: number): Promise<Array<AtendimentoEvento>> {
    try {
      return await this.AtendimentoEventoRepository.find({ relations, where: { codigo_atendimento: codigoAtendimento } });
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findByCodigo(codigoAtendimento: number, codigo: number): Promise<AtendimentoEvento> {
    try {
      this.atendimentoEvento = await this.AtendimentoEventoRepository.findOneBy({ codigo, codigo_atendimento: codigoAtendimento });
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.atendimentoEvento) {
      throw new NotFoundException();
    } else {
      return this.atendimentoEvento;
    }
  }

  async update(codigo: number, updateAtendimentoEventoDto: UpdateAtendimentoEventoDto): Promise<AtendimentoEvento> {
    try {
      const { codigo_atendimento } = updateAtendimentoEventoDto;
      this.atendimentoEvento = await this.AtendimentoEventoRepository.findOneBy({ codigo, codigo_atendimento });

      if (this.atendimentoEvento) {
        this.atendimentoEvento = Object.assign(this.atendimentoEvento, updateAtendimentoEventoDto);

        await this.AtendimentoEventoRepository.update({ codigo }, updateAtendimentoEventoDto);
      }
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.atendimentoEvento) {
      throw new NotFoundException();
    } else {
      return this.atendimentoEvento;
    }
  }

  async remove(codigoAtendimento: number, codigo: number): Promise<string> {
    try {
      const result: DeleteResult = await this.AtendimentoEventoRepository.delete({ codigo, codigo_atendimento: codigoAtendimento });

      result.affected > 0 ? (this.atendimentoEvento = new AtendimentoEvento()) : (this.atendimentoEvento = undefined);
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.atendimentoEvento) {
      throw new NotFoundException();
    } else {
      return `Resgistro de código ${codigo} removido.`;
    }
  }
}
