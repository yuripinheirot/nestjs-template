import {
  applyDecorators,
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { PublicRoute } from './public-route.decorator';

type AppControllerOptions = {
  tag: string;
  path: string;
  isPublic?: boolean;
};

export const AppController = (params: AppControllerOptions) => {
  const { tag, path, isPublic } = params;

  const decorators = [
    Controller(path),
    ApiTags(tag),
    UseInterceptors(ClassSerializerInterceptor),
    ...(isPublic ? [PublicRoute(true)] : []),
    ...(!isPublic ? [ApiSecurity('Bearer Auth')] : []),
  ];

  return applyDecorators(...decorators);
};
