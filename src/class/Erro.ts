import { ConflictException, InternalServerErrorException } from '@nestjs/common';

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
    const msgReferenceBR = `Chave estrangeira ${foreignKey} não foi encontrada.`;
    const msgReferenceEN = `Foreign key ${foreignKey} was not found.`;

    throw new ConflictException({
      message: [
        msgReferenceEN,
        msgReferenceBR
      ],
      error: "Conflict",
      statusCode: 409,
      errno: 1
    });
  }

  erroIsReference(error: any) {
    const message: string = error.message;
    const msgReferenceBR = `Não é possível excluir ou atualizar porque o campo ${message.slice(message.indexOf('FOREIGN KEY (') + 13, message.indexOf(') REFERENCES'))}, é referenciado em outro lugar.`;
    const msgReferenceEN = `It is not possible to delete or update because the field ${message.slice(message.indexOf('FOREIGN KEY (') + 13, message.indexOf(') REFERENCES'))}, is referenced in another place.`;

    throw new ConflictException({
      message: [
        msgReferenceEN,
        msgReferenceBR
      ],
      error: "Conflict",
      statusCode: 409,
      errno: 2
    });
  }

  erroDuplicate(error: any) {
    const message: string = error.message;
    const field: string = message.slice(message.indexOf('\''), message.indexOf(' for'));
    const msgDuplicateBR: string = `O valor ${field} é duplicado e não pode ser registrado.`;
    const msgDuplicateEN: string = `The value ${field} is duplicated and cannot be registered.`;

    throw new ConflictException({
      message: [
        msgDuplicateEN,
        msgDuplicateBR
      ],
      error: "Conflict",
      statusCode: 409,
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
