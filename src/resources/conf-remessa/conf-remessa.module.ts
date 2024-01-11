import { Module } from '@nestjs/common';
import { ConfRemessaService } from './conf-remessa.service';
import { ConfRemessaController } from './conf-remessa.controller';
import { DatabaseModule } from 'src/dataBase/dados.module';
import { ConfRemessaProvider } from './conf-remessa.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ConfRemessaController],
  providers: [ConfRemessaService, ...ConfRemessaProvider],
})
export class ConfRemessaModule {}
