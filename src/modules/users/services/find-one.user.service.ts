import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { AppService } from '@/models/types/service.type';

import { UsersRepository } from '../repository/users.repository';
import { FindUserDto } from '../protocols/find.user.dto';

@Injectable()
export class FindOneUserService implements AppService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly logger: Logger,
  ) {}

  async handle(where: FindUserDto) {
    this.logger.debug(
      `Searching for user with criteria: ${JSON.stringify(where)}`,
    );
    const user = await this.usersRepository.find(where);

    if (!user) {
      this.logger.warn(
        `User not found with criteria: ${JSON.stringify(where)}`,
      );
      throw new NotFoundException('User not found');
    }

    this.logger.debug(`User found with id: ${user.id}`);
    return user;
  }
}
