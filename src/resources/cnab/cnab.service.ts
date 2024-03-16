import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCnabDto } from './dto/create-cnab.dto';
import { UpdateCnabDto } from './dto/update-cnab.dto';
import { Cnab } from './entities/cnab.entity';
import { ErroSystem } from 'src/class/Erro';
import { DeleteResult, Repository } from 'typeorm';

const relations = ['status'];

@Injectable()
export class CnabService {
  private cnab: Cnab;
  private error: ErroSystem;

  constructor(
    @Inject('CNAB_REPOSITORY') private cnabRepository: Repository<Cnab>,
  ) {
    this.cnab = undefined;
    this.error = new ErroSystem();
  }

  async create(createCnabDto: CreateCnabDto): Promise<Cnab> {
    try {
      return await this.cnabRepository.save(createCnabDto);
    } catch (error) {
      this.error.erroMapeamento(error);
    }
  }

  async findAll(): Promise<Array<Cnab>> {
    try {
      return await this.cnabRepository.find({ relations });
    } catch (error) {
      this.error.erroMapeamento(error);
    }
  }

  async findByCodigo(codigo: number): Promise<Cnab> {
    try {
      this.cnab = await this.cnabRepository.findOneBy({ codigo });
    } catch (error) {
      this.error.erroMapeamento(error);
    }

    if (!this.cnab) {
      throw new NotFoundException();
    } else {
      return this.cnab;
    }
  }

  async update(codigo: number, updateCnabDto: UpdateCnabDto): Promise<Cnab> {
    try {
      this.cnab = await this.cnabRepository.findOneBy({ codigo });

      if (this.cnab) {
        this.cnab = Object.assign(this.cnab, updateCnabDto);

        await this.cnabRepository.update({ codigo }, updateCnabDto);
      }
    } catch (error) {
      this.error.erroMapeamento(error);
    }

    if (!this.cnab) {
      throw new NotFoundException();
    } else {
      return this.cnab;
    }
  }

  async remove(codigo: number): Promise<string> {
    try {
      const result: DeleteResult = await this.cnabRepository.delete({ codigo });

      result.affected > 0 ? (this.cnab = new Cnab()) : (this.cnab = undefined);
    } catch (error) {
      this.error.erroMapeamento(error);
    }

    if (!this.cnab) {
      throw new NotFoundException();
    } else {
      return `Resgistro de código ${codigo} removido.`;
    }
  }
}
