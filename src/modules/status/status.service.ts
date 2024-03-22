import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusService {
  getStatus() {
    return { message: `Service is up and running!` };
  }
}
