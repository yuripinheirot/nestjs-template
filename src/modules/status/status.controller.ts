import { Controller, Get } from '@nestjs/common';
import { StatusService } from './status.service';
import { Logger } from '@nestjs/common';
@Controller('status')
export class StatusController {
  constructor(
    private readonly statusService: StatusService,
    private readonly logger: Logger,
  ) {}

  @Get()
  getStatus() {
    this.logger.debug({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      allowedHeaders: '*',
    });
    return this.statusService.getStatus();
  }
}
