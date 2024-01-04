import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMessageApi(): string {
    return 'Api LocalTekApp';
  }
}
