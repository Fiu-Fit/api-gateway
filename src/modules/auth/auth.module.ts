import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:     [ConfigModule.forRoot(), HttpModule.register({})],
  exports:     [AuthService],
  providers:   [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
