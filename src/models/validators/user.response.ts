import { User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto implements User {
  @Expose()
  id: string;

  @Expose()
  name: string;

  password: string;

  @Expose()
  active: boolean;

  @Expose()
  document: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;

  updatedAt: Date;
  deletedAt: Date;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
