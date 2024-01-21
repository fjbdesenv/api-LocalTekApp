import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

// Necessário instalar:
//    class-validator
//    class-transformer
//    @nestjs/swagger
//    @nestjs/mapped-types

async function start() {
  const app = await NestFactory.create(AppModule);

  // Validação de campos
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true /* Aceita apenas o que estiver na class dto */,
      forbidNonWhitelisted:
        true /* Não permite o cadastro que estiver com campos não listado */,
    }),
  );

  // Configuração Swagger
  const config = new DocumentBuilder()
    .setTitle('Api LocalTekApp')
    .setDescription('Api para consumo de dados LocalTekApp.')
    .setVersion('0.8.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.use(
    helmet({
      crossOriginEmbedderPolicy: true,
      crossOriginResourcePolicy: { policy: 'same-site' },
    }),
  );

  await app.listen(5000);
}

start();
