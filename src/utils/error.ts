import { InternalServerErrorException } from "@nestjs/common";

export const ERROR = {
    erro500 (message: string) {
        console.error('ERRO: ' + message);
        throw new InternalServerErrorException(message);
    }
} 