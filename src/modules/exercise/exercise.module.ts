import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServiceConfig, ServiceName } from '../../../utils/service-config';
import { ExerciseController } from './exercise.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.registerAsync({
      useFactory: () => ServiceConfig.createHttpModuleOptions(ServiceName.Workout),
    }),
  ],
  controllers: [ExerciseController],
})
export class ExerciseModule {}
