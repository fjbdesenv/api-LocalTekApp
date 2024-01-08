import { Module } from '@nestjs/common';
import { CnabService } from './cnab.service';
import { CnabController } from './cnab.controller';
import { DatabaseModule } from 'src/dataBase/dados.module';
import { cnabProvider } from './cnab.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CnabController],
  providers: [CnabService, ...cnabProvider],
})
export class CnabModule {}
