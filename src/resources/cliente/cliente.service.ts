import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { ErroSystem } from 'src/class/Erro';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ClienteService {
  private cliente:Cliente;
  private error: ErroSystem;

  constructor(
    @Inject('CLIENTE_REPOSITORY') private clienteRepository: Repository<Cliente>
  ) {
    this.cliente = undefined;
    this.error = new ErroSystem();
  }

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    try {
      return await this.clienteRepository.save(createClienteDto);
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findAll(): Promise<Array<Cliente>> {
    try {
      return await this.clienteRepository.find();
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findByCodigo(codigo: number): Promise<Cliente> {
    
    try {
      this.cliente = await this.clienteRepository.findOneBy({ codigo });
    } catch (error) {
      this.error.erro500(error.message);
    }

    if(!this.cliente){
      throw new NotFoundException();
    }else{
      return this.cliente;
    }  
  }

  async update(codigo: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
     
    try {
      this.cliente = await this.clienteRepository.findOneBy({ codigo });
      
      if(this.cliente){
        this.cliente = Object.assign(this.cliente, updateClienteDto);
        
        await this.clienteRepository.update({codigo}, updateClienteDto);
      }
    } catch (error) {
      this.error.erro500(error.message);
    }

    if(!this.cliente){
      throw new NotFoundException();
    }else{
      return this.cliente;
    }  
  }

  async remove(codigo: number): Promise<string> {
    try {
      const result:DeleteResult = await this.clienteRepository.delete({ codigo });
      
      result.affected > 0 ? this.cliente = new Cliente() : this.cliente = undefined;
      
    } catch (error) {
      this.error.erro500(error.message);
    }
    
    if(!this.cliente){
      throw new NotFoundException();
    }else{
      return `Resgistro de código ${codigo} removido.`;
    }
  }
}
