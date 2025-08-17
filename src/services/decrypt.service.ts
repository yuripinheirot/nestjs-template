import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AppService } from '@/models/types/service.type';

@Injectable()
export class DecryptService implements AppService {
  async handle(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
