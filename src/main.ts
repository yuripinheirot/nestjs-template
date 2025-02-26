import { NestFactory } from '@nestjs/core';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './modules/app.module';

async function bootstrap() {
  const logger = new ConsoleLogger({ timestamp: true });
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
  });

  app.set('query parser', 'extended');

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const { APP_PORT, ENV } = process.env;

  await app.listen(APP_PORT, () => {
    logger.log(
      `Server started successfully 🚀 | Port: ${APP_PORT} | Env: ${ENV}`,
      'NestApplication',
    );
  });
}

bootstrap();
