import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  USER_PACKAGE_NAME,
  userProtoBufPackage,
} from './interfaces/user.interfaces';
import { UserController } from './user.controller';

@Module({
  imports: [
    // Import other modules here
    ClientsModule.register([
      {
        name:      USER_PACKAGE_NAME,
        transport: Transport.GRPC,
        options:   {
          package:   userProtoBufPackage,
          protoPath: './src/modules/user/interfaces/user.proto',
        },
      },
    ]),
  ],
  exports:     [],
  controllers: [UserController],
})
export class UserModule {}
