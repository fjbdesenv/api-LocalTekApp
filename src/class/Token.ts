import { ApiProperty } from '@nestjs/swagger';

type typeToken = string | undefined;

export class Token {
  constructor(type: typeToken, token: typeToken) {
    this.type = type;
    this.token = token;
  }

  type: typeToken;

  @ApiProperty({ example: 'token' })
  token: typeToken;

}
