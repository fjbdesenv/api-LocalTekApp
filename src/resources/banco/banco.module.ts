import { Module } from '@nestjs/common';
import { BancoService } from './banco.service';
import { BancoController } from './banco.controller';
import { DatabaseModule } from 'src/dataBase/dados.module';
import { bancoProvider } from './banco.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [BancoController],
  providers: [BancoService, ...bancoProvider],
})
export class BancoModule {}
