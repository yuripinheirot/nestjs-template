import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { AppService } from '@/models/types/service.type';

@Injectable()
export class IdGeneratorService implements AppService<string> {
  async handle(): Promise<string> {
    return uuidv4();
  }
}
