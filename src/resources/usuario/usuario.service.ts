import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Criptografia } from 'src/class/Criptografia';
import { ErroSystem } from 'src/class/Erro';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UsuarioService {
  private usuario: Usuario;
  private error: ErroSystem;
  private criptografia: Criptografia;

  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) {
    this.usuario = undefined;
    this.error = new ErroSystem();
    this.criptografia = new Criptografia();
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      // Criptografia de senha
      createUsuarioDto.senha = await this.criptografia.criptografar(
        createUsuarioDto.senha,
      );

      this.usuario = await this.usuarioRepository.save(createUsuarioDto);
      this.usuario = await this.usuarioRepository.findOneBy({
        codigo: this.usuario.codigo,
      });

      // Oculta a senha
      this.usuario.senha = undefined;

      return this.usuario;
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findAll(): Promise<Array<Usuario>> {
    try {
      const usuarios: Array<Usuario> = await this.usuarioRepository.find();

      // Oculta a senha
      usuarios.forEach(usuario => {
        usuario.senha = undefined;
      });

      return usuarios;
    } catch (error) {
      this.error.erro500(error.message);
    }
  }

  async findByCodigo(codigo: number): Promise<Usuario> {
    try {
      this.usuario = await this.usuarioRepository.findOneBy({ codigo });
      
      // Oculta a senha
      this.usuario.senha = undefined;

    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.usuario) {
      throw new NotFoundException();
    } else {
      return this.usuario;
    }
  }

  async findAuth(auth: AuthDto): Promise<Usuario> {
    try {
      const { email, senha } = auth;

      this.usuario = await this.usuarioRepository.findOneBy({ email });

      if (this.usuario) {
        const resultado = await this.criptografia.comparar(senha, this.usuario.senha);
        if (!resultado) this.usuario = undefined;
      }

    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.usuario) {
      throw new UnauthorizedException();
    } else {
      return this.usuario;
    }
  }

  async update(
    codigo: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    try {
      this.usuario = await this.usuarioRepository.findOneBy({ codigo });

      if (this.usuario) {
        this.usuario = Object.assign(this.usuario, updateUsuarioDto);

        // Criptografia de senha
        if (updateUsuarioDto.senha) {
          updateUsuarioDto.senha = await this.criptografia.criptografar(
            updateUsuarioDto.senha,
          );
        }

        await this.usuarioRepository.update({ codigo }, updateUsuarioDto);

        // Oculta a senha
        this.usuario.senha = undefined;
      
      }
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.usuario) {
      throw new NotFoundException();
    } else {
      return this.usuario;
    }
  }

  async remove(codigo: number): Promise<string> {
    try {
      const result: DeleteResult = await this.usuarioRepository.delete({
        codigo,
      });

      result.affected > 0
        ? (this.usuario = new Usuario())
        : (this.usuario = undefined);
    } catch (error) {
      this.error.erro500(error.message);
    }

    if (!this.usuario) {
      throw new NotFoundException();
    } else {
      return `Resgistro de código ${codigo} removido.`;
    }
  }
}
