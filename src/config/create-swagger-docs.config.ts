import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

export const createSwaggerDocs = (app: NestExpressApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Econome API')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'http',
        scheme: 'bearer',
        in: 'header',
        description: 'API Key for authentication',
      },
      'Bearer Auth',
    )
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`/docs`, app, documentFactory, {
    jsonDocumentUrl: `/docs-json`,
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
