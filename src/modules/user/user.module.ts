import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';

@Module({
  imports:     [AuthModule],
  exports:     [],
  controllers: [UserController],
})
export class UserModule {}
