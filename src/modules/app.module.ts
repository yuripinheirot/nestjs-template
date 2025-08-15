import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { StatusModule } from './status/status.module';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), StatusModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
