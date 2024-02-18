type typeToken = string | undefined;

export class Token {
  constructor(type: typeToken, token: typeToken) {
    this.type = type;
    this.token = token;
  }

  type: typeToken;
  token: typeToken;
}
