import { Injectable } from '@nestjs/common';
import { MessageHealth } from "./class/MessageHealth";
@Injectable()
export class AppService {
  private messageHealth: MessageHealth = new MessageHealth();

  getMessageApi(): object {
    this.messageHealth.name = 'api LocalTekApp';
    this.messageHealth.version = process.env.APP_VERSION || '0.0.0';
    this.messageHealth.doc = `${process.env.APP_HOST}/doc`;

    return this.messageHealth;
  }

}
