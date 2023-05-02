import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WorkoutController } from './workout.controller';

@Module({
  imports:     [HttpModule.register({}), ConfigModule.forRoot()],
  controllers: [WorkoutController],
})
export class WorkoutModule {}
