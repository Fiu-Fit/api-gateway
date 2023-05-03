import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServiceConfig, ServiceName } from '../../../utils/service-config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.registerAsync({
      useFactory: () => ServiceConfig.createHttpModuleOptions(ServiceName.User),
    }),
  ],
  exports:     [AuthService],
  providers:   [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
