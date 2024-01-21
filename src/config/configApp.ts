import { DocumentBuilder } from "@nestjs/swagger";

export const configApp = new DocumentBuilder()
    .setTitle('Api LocalTekApp')
    .setDescription('Api para consumo de dados LocalTekApp.')
    .setVersion(process.env.APP_VERSION || '0.0.0')
    .addBearerAuth()
    .build();
