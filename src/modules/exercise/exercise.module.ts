import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExerciseController } from './exercise.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({ baseURL: process.env.WORKOUT_SERVICE_URL }),
  ],
  controllers: [ExerciseController],
})
export class ExerciseModule {}
