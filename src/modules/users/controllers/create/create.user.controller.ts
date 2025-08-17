import { Body, Post } from '@nestjs/common';

import { createUserSwagger } from './create.user.swagger.ts';

import { AppControllerType } from '@/models/types/controller.type';
import { AppController } from '@/decorators/app-controller.decorator';
import { ControllerSwagger } from '@/decorators/controller-swagger.decorator';
import { AppLoggerService } from '@/utils/app-logger/app-logger.service';

import { CreateUserService } from '../../services/create.user.service';
import { CreateUserRequestDto } from '../../protocols/validators/create.user.request.dto';

@AppController({
  tag: 'Users',
  path: 'users',
  isPublic: true,
})
export class CreateUserController implements AppControllerType {
  constructor(
    private readonly usersService: CreateUserService,
    private readonly logger: AppLoggerService,
  ) {}

  @Post()
  @ControllerSwagger(createUserSwagger)
  async handle(@Body() createUserDto: CreateUserRequestDto) {
    this.logger.log(
      `Received request to create user with email: ${createUserDto.email}`,
    );

    await this.usersService.handle(createUserDto);

    this.logger.log(
      `User creation completed for email: ${createUserDto.email}`,
    );
    return {
      message: 'User created successfully',
    };
  }
}
