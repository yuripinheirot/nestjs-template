import { ControllerSwaggerType } from '@/decorators/controller-swagger.decorator';
import { UserResponseDto } from '@/models/validators/user.response';

export const findUserSwagger: ControllerSwaggerType = {
  summary: 'Find a user by id',
  description: 'Find a user by id',
  apiQuery: [{ name: 'id', type: Number }],
  apiResponse: [{ type: UserResponseDto }],
};
