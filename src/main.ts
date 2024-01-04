import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  const app = await NestFactory.create(AppModule);

  /* Necessario instalar class-validator e class-transformer */
  app.useGlobalPipes( new ValidationPipe({
    whitelist: true,  /* Aceita apenas o que estiver na class dto */
    forbidNonWhitelisted: true, /* Não permite o cadastro que estiver com campos não listado */
  }));

  await app.listen(3000);
}

start();
