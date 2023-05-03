import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';

@Module({
  imports: [
    AuthModule,
    HttpModule.register({
      baseURL: process.env.USER_SERVICE_URL,
    }),
    ConfigModule.forRoot(),
  ],
  exports:     [],
  controllers: [UserController],
})
export class UserModule {}
