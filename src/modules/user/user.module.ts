import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';

@Module({
  imports:     [AuthModule, HttpModule],
  exports:     [],
  controllers: [UserController],
})
export class UserModule {}
