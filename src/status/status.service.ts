import { Inject, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { DeleteResult, Repository } from 'typeorm';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {
  private status:Status;

  constructor(
    @Inject('STATUS_REPOSITORY') private statusRepository: Repository<Status>
  ) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    try {
      return await this.statusRepository.save(createStatusDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Array<Status>> {
    try {
      return await this.statusRepository.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findByCodigo(codigo: number): Promise<Status> {
    
    try {
      this.status = await this.statusRepository.findOneBy({ codigo });
    } catch (error) {
      throw new InternalServerErrorException();
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
      throw new InternalServerErrorException();
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
      if(result.affected > 0){
        this.statusRepository.delete({ codigo });
        this.status = new Status();
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }

    if(!this.status){
      throw new NotFoundException();
    }else{
      return `Resgistro de código ${codigo} removido`;
    }
  }
}
