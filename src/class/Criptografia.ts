import { hash, compare } from 'bcrypt';

export class Criptografia {
  private saltOrRounds: number;

  constructor() {
    this.saltOrRounds = 10;
  }

  async criptografar(senha: string): Promise<string> {
    return await hash(senha, this.saltOrRounds);
  }

  async comparar(senha, senhaCriptografada): Promise<boolean> {
    return await compare(senha, senhaCriptografada);
  }
}
