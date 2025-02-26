import { Module, Logger } from '@nestjs/common';

import { StatusService } from './status.service';
import { StatusController } from './status.controller';

@Module({ controllers: [StatusController], providers: [StatusService, Logger] })
export class StatusModule {}
