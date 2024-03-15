import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { DatabaseModule } from 'src/dataBase/dados.module';
import { statusProvider } from './status.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [StatusController],
  providers: [StatusService, ...statusProvider],
})
export class StatusModule { }
