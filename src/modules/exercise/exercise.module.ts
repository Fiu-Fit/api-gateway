import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExerciseController } from './exercise.controller';

@Module({
  imports:     [HttpModule.register({}), ConfigModule.forRoot()],
  controllers: [ExerciseController],
})
export class ExerciseModule {}
