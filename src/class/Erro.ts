import { InternalServerErrorException } from '@nestjs/common';

export class ErroSystem {
  erro500(message: string) {
    console.error('ERRO: ' + message);
    throw new InternalServerErrorException(message);
  }
}
