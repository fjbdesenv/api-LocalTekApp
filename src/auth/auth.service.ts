import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from './dto/auth.dto';
import { Usuario } from 'src/resources/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/resources/usuario/usuario.service';
import { Token } from './Token';

@Injectable()
export class AuthService {
  constructor(private readonly usuarioService: UsuarioService, private jwtService: JwtService) { }

  async signIn(auth: AuthDto): Promise<any> {

    const usuario = await this.usuarioService.findAuth(auth);

    if (usuario) {
      return { token: this.gerarToken(usuario) };
    } else {
      throw new UnauthorizedException();
    }
  }

  gerarToken(payload: Usuario) {

    const { codigo, email, nivel } = payload;
    return this.jwtService.sign(
      { codigo, email, nivel },
      { secret: process.env.JWT_SECRET, expiresIn: '30d' }
    );
  }

  verificarToken({ token }: Token) {
    return this.jwtService.verify(
      token,
      { secret: process.env.JWT_SECRET }
    );
  }
}
