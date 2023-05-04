import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WorkoutController } from './workout.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({ baseURL: process.env.WORKOUT_SERVICE_URL }),
  ],
  controllers: [WorkoutController],
})
export class WorkoutModule {}
