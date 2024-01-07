import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


// Necessário instalar: 
//    class-validator 
//    class-transformer
//    @nestjs/swagger 
//    @nestjs/mapped-types

async function start() {
  const app = await NestFactory.create(AppModule);

  // Validação de campos
  app.useGlobalPipes( new ValidationPipe({
    whitelist: true,  /* Aceita apenas o que estiver na class dto */
    forbidNonWhitelisted: true, /* Não permite o cadastro que estiver com campos não listado */
  }));

  // Configuração Swagger
  const config = new DocumentBuilder()
    .setTitle('Api LocalTekApp')
    .setDescription('Api para consumo de dados LocalTekApp.')
    .setVersion('0.3.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(5000);
}

start();
