import { ApiProperty } from '@nestjs/swagger';

export class Token {
  constructor(token) {
    this.token = token;
  }

  @ApiProperty({ example: 'token' })
  token: string;

}
