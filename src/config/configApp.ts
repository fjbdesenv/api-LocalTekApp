import { DocumentBuilder } from "@nestjs/swagger";

export const configApp = new DocumentBuilder()
    .setTitle('Api LocalTekApp')
    .setDescription('Api para consumo de dados LocalTekApp.')
    .addServer(process.env.APP_HOST || 'http://localhost:5000/')
    .setVersion(process.env.APP_VERSION || '0.11.1')
    .addBearerAuth()
    .build();
