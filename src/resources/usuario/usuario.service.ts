import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ERROR } from 'src/utils/error';

@Injectable()
export class UsuarioService {
  private usuario:Usuario;

  constructor(
    @Inject('USUARIO_REPOSITORY') private usuarioRepository: Repository<Usuario>
  ) {
    this.usuario = undefined;
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      return await this.usuarioRepository.save(createUsuarioDto);
    } catch (error) {
      ERROR.erro500(error.message);
    }
  }

  async findAll(): Promise<Array<Usuario>> {
    try {
      return await this.usuarioRepository.find();
    } catch (error) {
      ERROR.erro500(error.message);
    }
  }

  async findByCodigo(codigo: number): Promise<Usuario> {
    
    try {
      this.usuario = await this.usuarioRepository.findOneBy({ codigo });
    } catch (error) {
      ERROR.erro500(error.message);
    }

    if(!this.usuario){
      throw new NotFoundException();
    }else{
      return this.usuario;
    }  
  }

  async update(codigo: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
     
    try {
      this.usuario = await this.usuarioRepository.findOneBy({ codigo });
      
      if(this.usuario){
        this.usuario = Object.assign(this.usuario, updateUsuarioDto);
        
        await this.usuarioRepository.update({codigo}, updateUsuarioDto);
      }
    } catch (error) {
      ERROR.erro500(error.message);
    }

    if(!this.usuario){
      throw new NotFoundException();
    }else{
      return this.usuario;
    }  
  }

  async remove(codigo: number): Promise<string> {
    try {
      const result:DeleteResult = await this.usuarioRepository.delete({ codigo });
      
      result.affected > 0 ? this.usuario = new Usuario() : this.usuario = undefined;
      
    } catch (error) {
      ERROR.erro500(error.message);
    }
    
    if(!this.usuario){
      throw new NotFoundException();
    }else{
      return `Resgistro de código ${codigo} removido.`;
    }
  }
}
