import { DEFAULT_PROTO_PATH } from '@fiu-fit/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';
import { USER_SERVICE_NAME, protobufPackage } from './interfaces/user.pb';
import { UserController } from './user.controller';

@Module({
  imports: [
    AuthModule,
    // Import other modules here
    ClientsModule.register([
      {
        name:      USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options:   {
          url:       process.env.USER_SERVICE_URL,
          package:   protobufPackage,
          protoPath: `${DEFAULT_PROTO_PATH}/user.proto`,
        },
      },
    ]),
  ],
  exports:     [],
  controllers: [UserController],
})
export class UserModule {}
