import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import {
  ConfigModule,
  ConfigModuleOptions,
} from '@nestjs/config'; /* configuração env global*/
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { StatusModule } from './resources/status/status.module';
import { UsuarioModule } from './resources/usuario/usuario.module';
import { ClienteModule } from './resources/cliente/cliente.module';
import { AtendimentoModule } from './resources/atendimento/atendimento.module';
import { AtendimentoEventoModule } from './resources/atendimento-evento/atendimento-evento.module';
import { AtendimentoArquivoModule } from './resources/atendimento-arquivo/atendimento-evento.module';
import { BancoModule } from './resources/banco/banco.module';
import { CnabModule } from './resources/cnab/cnab.module';
import { RemessaFinanceiraModule } from './resources/remessaFinanceira/remessaFinanceira.module';
import { AuthModule } from './auth/auth.module';
import { CheckAuth } from './middleware/checkAuth';
import { JwtModule } from '@nestjs/jwt';

const configGetEnv: ConfigModuleOptions = {
  envFilePath: ['.env.development.local', '.env.development'],
  isGlobal: true,
};

@Module({
  imports: [
    ConfigModule.forRoot(configGetEnv),
    AuthModule,
    UsuarioModule,
    ClienteModule,
    AtendimentoModule,
    AtendimentoEventoModule,
    AtendimentoArquivoModule,
    BancoModule,
    CnabModule,
    RemessaFinanceiraModule,
    StatusModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuth)
      .exclude(
        { path: '/', method: RequestMethod.GET },
        { path: '/doc', method: RequestMethod.GET },
        { path: '/auth', method: RequestMethod.POST },
        { path: '/health', method: RequestMethod.GET },
      ).forRoutes('')
  }
}
