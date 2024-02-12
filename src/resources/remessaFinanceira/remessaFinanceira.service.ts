import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRemessaFinanceiraDto } from './dto/create-remessaFinanceira.dto';
import { UpdateRemessaFinanceiraDto } from './dto/update-remessaFinanceira.dto';
import { RemessaFinanceira } from './entities/remessaFinanceira.entity';
import { ErroSystem } from 'src/class/Erro';
import { DeleteResult, Repository } from 'typeorm';

const relations = ['status', 'banco', 'atendimento', 'cnab'];

@Injectable()
export class RemessaFinanceiraService {
  private remessaFinanceira: RemessaFinanceira;
  private error: ErroSystem;

  constructor(
    @Inject('REMESSA_FINANCEIRA_REPOSITORY')
    private remessaFinanceiraRepository: Repository<RemessaFinanceira>,
  ) {
    this.remessaFinanceira = undefined;
    this.error = new ErroSystem();
  }

  async create(
    createConfRemessaDto: CreateRemessaFinanceiraDto,
  ): Promise<RemessaFinanceira> {
    try {
      return await this.remessaFinanceiraRepository.save(createConfRemessaDto);
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findAll(): Promise<Array<RemessaFinanceira>> {
    try {
      return await this.remessaFinanceiraRepository.find({ relations });
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findByCodigo(codigo: number): Promise<RemessaFinanceira> {
    try {
      this.remessaFinanceira = await this.remessaFinanceiraRepository.findOneBy({ codigo });
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.remessaFinanceira) {
      throw new NotFoundException();
    } else {
      return this.remessaFinanceira;
    }
  }

  async update(
    codigo: number,
    updateConfRemessaDto: UpdateRemessaFinanceiraDto,
  ): Promise<RemessaFinanceira> {
    try {
      this.remessaFinanceira = await this.remessaFinanceiraRepository.findOneBy({ codigo });

      if (this.remessaFinanceira) {
        this.remessaFinanceira = Object.assign(
          this.remessaFinanceira,
          updateConfRemessaDto,
        );

        await this.remessaFinanceiraRepository.update(
          { codigo },
          updateConfRemessaDto,
        );
      }
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.remessaFinanceira) {
      throw new NotFoundException();
    } else {
      return this.remessaFinanceira;
    }
  }

  async remove(codigo: number): Promise<string> {
    try {
      const result: DeleteResult = await this.remessaFinanceiraRepository.delete({
        codigo,
      });

      result.affected > 0
        ? (this.remessaFinanceira = new RemessaFinanceira())
        : (this.remessaFinanceira = undefined);
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.remessaFinanceira) {
      throw new NotFoundException();
    } else {
      return `Resgistro de código ${codigo} removido.`;
    }
  }
}
