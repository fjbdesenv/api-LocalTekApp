import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioService } from 'src/resources/usuario/usuario.service';
import { usuarioProvider } from 'src/resources/usuario/usuario.provider';
import { DatabaseModule } from 'src/dataBase/dados.module';

@Module({
  imports:[DatabaseModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, UsuarioService, ...usuarioProvider],
})
export class AuthModule {}
