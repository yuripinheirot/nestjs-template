import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { StatusService } from './status.service';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @ApiOperation({ summary: 'Obtém o status do servidor' })
  @ApiResponse({ status: 200, description: 'Service is running' })
  getStatus() {
    return this.statusService.getStatus();
  }
}
