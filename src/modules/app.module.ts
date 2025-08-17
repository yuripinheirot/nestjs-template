import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { StatusModule } from './status/status.module';
import { UsersModule } from './users/users.module';

import { AppLoggerModule } from '@/utils/app-logger/app-logger.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StatusModule,
    UsersModule,
    AppLoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
