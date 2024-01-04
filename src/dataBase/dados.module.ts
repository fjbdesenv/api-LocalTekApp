import { Module } from '@nestjs/common';
import { databaseProviders } from './dados.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}