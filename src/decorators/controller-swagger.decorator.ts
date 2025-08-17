import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiBodyOptions,
  ApiOperation,
  ApiQuery,
  ApiQueryOptions,
  ApiResponse,
  ApiResponseOptions,
  ApiParam,
  ApiParamOptions,
} from '@nestjs/swagger';

export type ControllerSwaggerType = {
  summary: string;
  description: string;
  apiParam?: ApiParamOptions[];
  apiQuery?: ApiQueryOptions[];
  apiBody?: ApiBodyOptions[];
  apiResponse: ApiResponseOptions[];
  isPublic?: boolean;
};

export const ControllerSwagger = (params: ControllerSwaggerType) => {
  const { summary, description, apiParam, apiQuery, apiBody, apiResponse } =
    params;

  return applyDecorators(
    ApiOperation({ summary, description }),
    ...(apiParam ? apiParam.map((param) => ApiParam(param)) : []),
    ...(apiQuery ? apiQuery.map((query) => ApiQuery(query)) : []),
    ...(apiBody ? apiBody.map((body) => ApiBody(body)) : []),
    ...(apiResponse
      ? apiResponse.map((response) => ApiResponse(response))
      : []),
  );
};
