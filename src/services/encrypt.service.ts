import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AppService } from '@/models/types/service.type';

@Injectable()
export class EncryptService implements AppService {
  async hash(value: string): Promise<string> {
    const SALT_ROUNDS = 10;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(value, salt);

    return hash;
  }

  async handle(value: string): Promise<string> {
    const result = await this.hash(value);

    return result;
  }
}
