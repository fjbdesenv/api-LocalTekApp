import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

export class ErroSystem {

  erro500(error: any) {
    throw new InternalServerErrorException({
      message: [error.message],
      error: "Internal Server Error",
      statusCode: 500,
      code: 1,
    });
  }

  erroForeignKey(error: any) {
    const message: string = error.message;
    const foreignKey = message.slice(message.indexOf('FOREIGN KEY (') + 13, message.indexOf(') REFERENCES'));
    const msgReference = `Foreign key ${foreignKey} was not found.`;

    throw new BadRequestException({
      message: [
        msgReference
      ],
      error: "Bad Request",
      statusCode: 400,
      errno: 1
    });
  }

  erroIsReference(error: any) {
    const message: string = error.message;
    const msgReference = `It is not possible to delete or update because the field ${message.slice(message.indexOf('FOREIGN KEY (') + 13, message.indexOf(') REFERENCES'))} is referenced in another table.`;

    throw new BadRequestException({
      message: [
        msgReference
      ],
      error: "Bad Request",
      statusCode: 400,
      errno: 2
    });
  }

  erroDuplicate(error: any) {
    const message: string = error.message;
    const field: string = message.slice(message.indexOf('\''), message.indexOf(' for'));
    const msgDuplicate: string = `The value ${field} is duplicated and cannot be registered.`;

    throw new BadRequestException({
      message: [
        msgDuplicate
      ],
      error: "Bad Request",
      statusCode: 400,
      errno: 3
    });
  }

  erroMapeamento(error: any) {
    console.error(`\nErro: ${error.message}`);

    if (error.code === 'ER_NO_REFERENCED_ROW_2') this.erroForeignKey(error);
    if (error.code === 'ER_ROW_IS_REFERENCED_2') this.erroIsReference(error);
    if (error.code === 'ER_DUP_ENTRY') this.erroDuplicate(error);
    else this.erro500(error); /* Erros não mepeados */
  }
}
