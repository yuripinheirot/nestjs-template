import { Logger, Module } from '@nestjs/common';

import { CreateUserService } from './services/create.user.service';
import { CreateUserController } from './controllers/create/create.user.controller';
import { UsersRepository } from './repository/users.repository';
import { FindUserController } from './controllers/find/find.user.controller';
import { FindOneUserService } from './services/find-one.user.service';

import { PrismaService } from '@/services/prisma.service';
import { EncryptService } from '@/services/encrypt.service';
import { JwtVerifyService } from '@/services/jwt-verify.service';

@Module({
  imports: [],
  controllers: [CreateUserController, FindUserController],
  providers: [
    CreateUserService,
    PrismaService,
    UsersRepository,
    FindOneUserService,
    EncryptService,
    JwtVerifyService,
    Logger,
  ],
})
export class UsersModule {}
