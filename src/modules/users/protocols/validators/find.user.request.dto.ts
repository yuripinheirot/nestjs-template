import { IsNotEmpty, IsUUID } from 'class-validator';

import { FindUserDto } from '../find.user.dto';

export class FindUserRequestDto implements FindUserDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
