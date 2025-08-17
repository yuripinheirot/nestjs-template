import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { StatusModule } from './status/status.module';
import { UsersModule } from './users/users.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StatusModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
