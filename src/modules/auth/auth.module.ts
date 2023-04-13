import { DEFAULT_PROTO_PATH } from '@fiu-fit/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AUTH_SERVICE_NAME, protobufPackage } from './interfaces/auth.pb';

@Module({
  imports: [
    // Import other modules here
    ClientsModule.register([
      {
        name:      AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options:   {
          url:       process.env.USER_SERVICE_URL,
          package:   protobufPackage,
          protoPath: `${DEFAULT_PROTO_PATH}/auth.proto`,
        },
      },
    ]),
  ],
  exports:     [AuthService],
  providers:   [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
