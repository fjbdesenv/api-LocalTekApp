import { ApiProperty } from '@nestjs/swagger';
import { Token } from './Token';

export class Auth {
    constructor(type: string, token: string, dados: object) {
        this.token = new Token(type, token);
        this.usuario = dados;
    }

    @ApiProperty({
        example: 'token'
    })
    token: Token;

    @ApiProperty({
        example: {
            codigo: 1,
            email: "adm@email.com",
            nome: "Admin",
            modulos: "Administrador|Especificidade|Remesssa", /*Pode mudar, verificar */
            nivel: 2
        }
    })
    usuario: object;

}
