import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServiceConfig, ServiceName } from '../../../utils/service-config';
import { WorkoutController } from './workout.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.registerAsync({
      useFactory: () => ServiceConfig.createHttpModuleOptions(ServiceName.Workout),
    }),
  ],
  controllers: [WorkoutController],
})
export class WorkoutModule {}
