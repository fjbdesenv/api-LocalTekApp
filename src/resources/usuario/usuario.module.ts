import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { DatabaseModule } from 'src/dataBase/dados.module';
import { usuarioProvider } from './usuario.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, ...usuarioProvider],
})
export class UsuarioModule {}
