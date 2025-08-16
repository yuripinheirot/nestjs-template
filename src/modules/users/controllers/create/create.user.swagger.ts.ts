import { ControllerSwaggerType } from '@/decorators/controller-swagger.decorator';

import { CreateUserRequestDto } from '../../protocols/validators/create.user.request.dto';

export const createUserSwagger: ControllerSwaggerType = {
  summary: 'Create a new user',
  description: 'Create a new user with the given data',
  apiBody: [
    {
      type: CreateUserRequestDto,
      examples: {
        admin: {
          value: {
            name: 'admin',
            email: 'admin@mail.com',
            password: 'admin',
            document: '1234567890',
          },
        },
      },
    },
  ],
  apiResponse: [],
};
