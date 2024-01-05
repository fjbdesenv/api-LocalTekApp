import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusModule } from './status/status.module';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config'; /* configuração env global*/
import { UsuarioModule } from './usuario/usuario.module';

const configGetEnv:ConfigModuleOptions = {
  envFilePath: ['.env.development.local', '.env.development'],
  isGlobal: true,
};

@Module({
  imports: [
    ConfigModule.forRoot(configGetEnv),
    StatusModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
