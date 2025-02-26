import { NestFactory } from '@nestjs/core';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './modules/app.module';

async function bootstrap() {
  const { APP_PORT, ENV, APP_PREFIX } = process.env;

  const logger = new ConsoleLogger({ timestamp: true });

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
  });
  app.setGlobalPrefix(APP_PREFIX);
  app.set('query parser', 'extended');

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Node Template API')
    .setDescription(
      'A template API built with NestJS that provides basic setup and structure for Node.js applications',
    )
    .setVersion('1.0')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${APP_PREFIX}/docs`, app, documentFactory, {
    jsonDocumentUrl: `${APP_PREFIX}/docs-json`,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.listen(APP_PORT, () => {
    logger.log(
      `Server started successfully 🚀 | Port: ${APP_PORT} | Env: ${ENV}`,
      'NestApplication',
    );
  });
}

bootstrap();
