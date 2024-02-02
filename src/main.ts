import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { configApp } from './config/configApp';

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

  const document = SwaggerModule.createDocument(app, configApp);
  SwaggerModule.setup('doc', app, document);

  app.enableCors({
    origin: '*',
    methods: ['POST', 'PUT', 'GET', 'PATCH', 'OPTIONS'],
    allowedHeaders:[ 'Authorization', 'Content-Type', 'Accept' ]
    
  });

  app.use(
    helmet(),
  );



  await app.listen(process.env.APP_PORT);
}

start();
