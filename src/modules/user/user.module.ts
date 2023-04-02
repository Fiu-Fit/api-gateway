import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PACKAGE_NAME, protobufPackage } from './interfaces/user.pb';
import { UserController } from './user.controller';

@Module({
  imports: [
    // Import other modules here
    ClientsModule.register([
      {
        name:      USER_PACKAGE_NAME,
        transport: Transport.GRPC,
        options:   {
          package:   protobufPackage,
          protoPath: 'node_modules/common/protos/user.proto',
        },
      },
    ]),
  ],
  exports:     [],
  controllers: [UserController],
})
export class UserModule {}
