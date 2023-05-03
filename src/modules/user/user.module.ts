import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServiceConfig, ServiceName } from '../../../utils/service-config';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';

@Module({
  imports: [
    AuthModule,
    HttpModule.registerAsync({
      useFactory: () => ServiceConfig.createHttpModuleOptions(ServiceName.User),
    }),
    ConfigModule.forRoot(),
  ],
  exports:     [],
  providers:   [],
  controllers: [UserController],
})
export class UserModule {}
