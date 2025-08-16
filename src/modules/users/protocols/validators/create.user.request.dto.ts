import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';

import { CreateUserDto } from '../create.user.dto';

export class CreateUserRequestDto implements CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  document: string;
}
