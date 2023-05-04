import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServiceConfig, ServiceName } from '../../shared/service-config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.registerAsync({
      imports:    [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ServiceConfig.createHttpModuleOptions(ServiceName.User, configService),
      inject: [ConfigService],
    }),
  ],
  exports:     [AuthService],
  providers:   [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
