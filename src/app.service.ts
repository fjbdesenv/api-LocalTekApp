import { Injectable } from '@nestjs/common';
import { MessageHealth } from "./class/MessageHealth";
import { Author } from './class/Authors';
@Injectable()
export class AppService {
  private messageHealth: MessageHealth = new MessageHealth();

  getMessageApi(): object {

    const author1: Author = new Author('Fábio Júnior Babosa', 'fjb.desenv@gmail.com');
    const authors: Array<Author> = [author1];

    this.messageHealth.name = 'api LocalTekApp';
    this.messageHealth.version = process.env.APP_VERSION || '0.0.0';
    this.messageHealth.doc = `${process.env.APP_HOST}/doc`;
    this.messageHealth.authors = authors;

    return this.messageHealth;
  }

}
