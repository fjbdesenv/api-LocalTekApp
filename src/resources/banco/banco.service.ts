import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';
import { Banco } from './entities/banco.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ErroSystem } from 'src/class/Erro';

@Injectable()
export class BancoService {
  private banco: Banco;
  private error: ErroSystem;

  constructor(
    @Inject('BANCO_REPOSITORY') private bancoRepository: Repository<Banco>,
  ) {
    this.banco = undefined;
    this.error = new ErroSystem();
  }

  async create(createBancoDto: CreateBancoDto): Promise<Banco> {
    try {
      return await this.bancoRepository.save(createBancoDto);
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findAll(): Promise<Array<Banco>> {
    try {
      return await this.bancoRepository.find();
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findByCodigo(codigo: number): Promise<Banco> {
    try {
      this.banco = await this.bancoRepository.findOneBy({ codigo });
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.banco) {
      throw new NotFoundException();
    } else {
      return this.banco;
    }
  }

  async update(codigo: number, updateBancoDto: UpdateBancoDto): Promise<Banco> {
    try {
      this.banco = await this.bancoRepository.findOneBy({ codigo });

      if (this.banco) {
        this.banco = Object.assign(this.banco, updateBancoDto);

        await this.bancoRepository.update({ codigo }, updateBancoDto);
      }
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.banco) {
      throw new NotFoundException();
    } else {
      return this.banco;
    }
  }

  async remove(codigo: number): Promise<string> {
    try {
      const result: DeleteResult = await this.bancoRepository.delete({
        codigo,
      });

      result.affected > 0
        ? (this.banco = new Banco())
        : (this.banco = undefined);
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.banco) {
      throw new NotFoundException();
    } else {
      return `Resgistro de código ${codigo} removido.`;
    }
  }
}
