import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { DatabaseModule } from 'src/dataBase/dados.module';
import { clienteProvider } from './cliente.provider'

@Module({
  imports: [DatabaseModule],
  controllers: [ClienteController],
  providers: [ClienteService, ...clienteProvider],
})
export class ClienteModule {}
