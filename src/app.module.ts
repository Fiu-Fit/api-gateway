import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { WorkoutModule } from './modules/workout/workout.module';

@Module({
  imports:     [ConfigModule.forRoot(), WorkoutModule, ExerciseModule],
  controllers: [AppController],
  providers:   [AppService],
})
export class AppModule {}
