import { DEFAULT_PROTO_PATH } from '@fiu-fit/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ExerciseController } from './exercise.controller';
import {
  EXERCISE_SERVICE_NAME,
  protobufPackage,
} from './interfaces/exercise.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name:      EXERCISE_SERVICE_NAME,
        transport: Transport.GRPC,
        options:   {
          url:       process.env.EXERCISE_SERVICE_URL,
          package:   protobufPackage,
          protoPath: `${DEFAULT_PROTO_PATH}/exercise.proto`,
        },
      },
    ]),
  ],
  controllers: [ExerciseController],
})
export class ExerciseModule {}
