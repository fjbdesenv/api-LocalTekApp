import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config'; /* configuração env global*/
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { StatusModule } from './resources/status/status.module';
import { UsuarioModule } from './resources/usuario/usuario.module';
import { ClienteModule } from './resources/cliente/cliente.module';
import { AtendimentoModule } from './resources/atendimento/atendimento.module';
import { BancoModule } from './resources/banco/banco.module';
import { CnabModule } from './resources/cnab/cnab.module';

const configGetEnv:ConfigModuleOptions = {
  envFilePath: ['.env.development.local', '.env.development'],
  isGlobal: true,
};

@Module({
  imports: [
    ConfigModule.forRoot(configGetEnv),
    StatusModule,
    UsuarioModule,
    ClienteModule,
    AtendimentoModule,
    BancoModule,
    CnabModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
