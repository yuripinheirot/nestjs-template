import { Global, Module } from '@nestjs/common';
import { StatusModule } from './modules/status/status.module';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), StatusModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
