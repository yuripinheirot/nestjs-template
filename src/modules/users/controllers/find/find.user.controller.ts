import { Get, Param } from '@nestjs/common';

import { findUserSwagger } from './find.user.swagger';

import { AppControllerType } from '@/models/types/controller.type';
import { UserResponseDto } from '@/models/validators/user.response';
import { AppController } from '@/decorators/app-controller.decorator';
import { ControllerSwagger } from '@/decorators/controller-swagger.decorator';
import { AppLoggerService } from '@/utils/app-logger/app-logger.service';

import { FindOneUserService } from '../../services/find-one.user.service';
import { FindUserRequestDto } from '../../protocols/validators/find.user.request.dto';

@AppController({
  tag: 'Users',
  path: 'users',
})
export class FindUserController implements AppControllerType {
  constructor(
    private readonly findOneUserService: FindOneUserService,
    private readonly logger: AppLoggerService,
  ) {}

  @Get(':id')
  @ControllerSwagger(findUserSwagger)
  async handle(@Param() { id }: FindUserRequestDto) {
    this.logger.log(`Received request to find user with id: ${id}`);
    const user = await this.findOneUserService.handle({ id });

    this.logger.debug(`User found successfully with id: ${id}`);
    return new UserResponseDto(user);
  }
}
