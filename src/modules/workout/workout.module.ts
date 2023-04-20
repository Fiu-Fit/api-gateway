import { DEFAULT_PROTO_PATH } from '@fiu-fit/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WORKOUT_SERVICE_NAME, protobufPackage } from './interfaces/workout.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name:      WORKOUT_SERVICE_NAME,
        transport: Transport.GRPC,
        options:   {
          url:       process.env.WORKOUT_SERVICE_URL,
          package:   protobufPackage,
          protoPath: `${DEFAULT_PROTO_PATH}/workout.proto`,
        },
      },
    ]),
  ],
})
export class WorkoutModule {}
