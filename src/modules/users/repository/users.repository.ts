import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/services/prisma.service';

import { CreateUserDto } from '../protocols/create.user.dto';
import { FindUserDto } from '../protocols/find.user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...data,
        active: true,
      },
    });
  }

  async find(where: FindUserDto) {
    return this.prisma.user.findUnique({
      where: {
        id: where.id,
        email: where.email,
        document: where.document,
      },
    });
  }
}
