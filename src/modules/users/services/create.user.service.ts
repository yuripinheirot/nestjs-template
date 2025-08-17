import { ConflictException, Injectable } from '@nestjs/common';

import { AppService } from '@/models/types/service.type';
import { EncryptService } from '@/services/encrypt.service';
import { AppLoggerService } from '@/utils/app-logger/app-logger.service';

import { CreateUserDto } from '../protocols/create.user.dto';
import { UsersRepository } from '../repository/users.repository';

@Injectable()
export class CreateUserService implements AppService<CreateUserDto> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly encryptService: EncryptService,
    private readonly logger: AppLoggerService,
  ) {}

  private async validateUser(data: CreateUserDto) {
    this.logger.debug(`Validating user with email: ${data.email}`);
    const user = await this.usersRepository.find({ email: data.email });

    if (user) {
      this.logger.warn(`User with email ${data.email} already exists`);
      throw new ConflictException('User already exists');
    }
  }

  private async buildUser(data: CreateUserDto) {
    this.logger.debug(`Building user data for email: ${data.email}`);
    const encryptedPassword = await this.encryptService.handle(data.password);

    return {
      ...data,
      password: encryptedPassword,
      active: true,
    };
  }

  async handle(data: CreateUserDto) {
    this.logger.log(`Creating new user with email: ${data.email}`);
    await this.validateUser(data);

    const user = await this.buildUser(data);

    const createdUser = await this.usersRepository.create(user);
    this.logger.log(`User created successfully with id: ${createdUser.id}`);
    return createdUser;
  }
}
