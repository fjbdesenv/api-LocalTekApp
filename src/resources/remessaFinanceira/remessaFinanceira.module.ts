import { Module } from '@nestjs/common';
import { RemessaFinanceiraService } from './remessaFinanceira.service';
import { RemessaFinanceiraController } from './remessaFinanceira.controller';
import { DatabaseModule } from 'src/dataBase/dados.module';
import { RemessaFinanceiraProvider } from './remessaFinanceira.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [RemessaFinanceiraController],
  providers: [RemessaFinanceiraService, ...RemessaFinanceiraProvider],
})
export class RemessaFinanceiraModule { }
