import { Inject, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { DeleteResult, Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import { ErroSystem } from 'src/class/Erro';

@Injectable()
export class StatusService {
  private status:Status;
  private error: ErroSystem;

  constructor(
    @Inject('STATUS_REPOSITORY') private statusRepository: Repository<Status>
  ) {
    this.status = undefined;
    this.error = new ErroSystem();
  }

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    try {
      return await this.statusRepository.save(createStatusDto);
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findAll(): Promise<Array<Status>> {
    try {
      return await this.statusRepository.find();
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findAllTipo(tipo: number): Promise<Array<Status>> {
    try {
      return await this.statusRepository.findBy({ tipo });
    } catch (error) {
      this.error.erro500(error.message);
    }
  }


  async findByCodigo(codigo: number): Promise<Status> {
    
    try {
      this.status = await this.statusRepository.findOneBy({ codigo });
    } catch (error) {
      this.error.erro500(error.message);
    }

    if(!this.status){
      throw new NotFoundException();
    }else{
      return this.status;
    }  
  }

  async update(codigo: number, updateStatusDto: UpdateStatusDto): Promise<Status> {
     
    try {
      this.status = await this.statusRepository.findOneBy({ codigo });
      
      if(this.status){
        this.status = Object.assign(this.status, updateStatusDto);
        
        await this.statusRepository.update({codigo}, updateStatusDto);
      }
    } catch (error) {
      this.error.erro500(error.message);
    }

    if(!this.status){
      throw new NotFoundException();
    }else{
      return this.status;
    }  
  }

  async remove(codigo: number): Promise<string> {
    try {
      const result:DeleteResult = await this.statusRepository.delete({ codigo });
      
      result.affected > 0 ? this.status = new Status() : this.status = undefined;
      
    } catch (error) {
      this.error.erro500(error.message);
    }
    
    if(!this.status){
      throw new NotFoundException();
    }else{
      return `Resgistro de código ${codigo} removido.`;
    }
  }
}
