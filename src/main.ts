import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ConsoleLogger,
  ConsoleLoggerOptions,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

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

  const appPort = 3003;

  await app.listen(appPort, () => {
    logger.log(`Application is running on port ${appPort}`, 'NestApplication');
  });
}

bootstrap();
