import { Module, RequestMethod } from '@nestjs/common';
import { StatusModule } from './modules/status/status.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { PrettyOptions } from 'pino-pretty';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          level: config.get('LOG_LEVEL', 'info'),
          redact: ['request.headers.authorization'],
          transport: {
            target: 'pino-pretty',
            options: {
              ignore: 'req.headers,pid,hostname,context,responseTime',
              colorize: true,
              singleLine: true,
              levelFirst: true,
              sync: true,
              translateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss.l'Z'",
            } as PrettyOptions,
          },
        },
        exclude: [{ method: RequestMethod.ALL, path: 'status' }],
      }),
      inject: [ConfigService],
    }),
    StatusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
