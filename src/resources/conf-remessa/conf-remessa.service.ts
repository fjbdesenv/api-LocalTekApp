import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateConfRemessaDto } from './dto/create-conf-remessa.dto';
import { UpdateConfRemessaDto } from './dto/update-conf-remessa.dto';
import { ConfRemessa } from './entities/conf-remessa.entity';
import { ErroSystem } from 'src/class/Erro';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ConfRemessaService {
  private confRemessa: ConfRemessa;
  private error: ErroSystem;

  constructor(
    @Inject('CONF_REMESSA_REPOSITORY')
    private confRemessaRepository: Repository<ConfRemessa>,
  ) {
    this.confRemessa = undefined;
    this.error = new ErroSystem();
  }

  async create(
    createConfRemessaDto: CreateConfRemessaDto,
  ): Promise<ConfRemessa> {
    try {
      return await this.confRemessaRepository.save(createConfRemessaDto);
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findAll(): Promise<Array<ConfRemessa>> {
    try {
      return await this.confRemessaRepository.find();
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findByCodigo(codigo: number): Promise<ConfRemessa> {
    try {
      this.confRemessa = await this.confRemessaRepository.findOneBy({ codigo });
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.confRemessa) {
      throw new NotFoundException();
    } else {
      return this.confRemessa;
    }
  }

  async update(
    codigo: number,
    updateConfRemessaDto: UpdateConfRemessaDto,
  ): Promise<ConfRemessa> {
    try {
      this.confRemessa = await this.confRemessaRepository.findOneBy({ codigo });

      if (this.confRemessa) {
        this.confRemessa = Object.assign(
          this.confRemessa,
          updateConfRemessaDto,
        );

        await this.confRemessaRepository.update(
          { codigo },
          updateConfRemessaDto,
        );
      }
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.confRemessa) {
      throw new NotFoundException();
    } else {
      return this.confRemessa;
    }
  }

  async remove(codigo: number): Promise<string> {
    try {
      const result: DeleteResult = await this.confRemessaRepository.delete({
        codigo,
      });

      result.affected > 0
        ? (this.confRemessa = new ConfRemessa())
        : (this.confRemessa = undefined);
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.confRemessa) {
      throw new NotFoundException();
    } else {
      return `Resgistro de código ${codigo} removido.`;
    }
  }
}
