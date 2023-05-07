import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { GoalModule } from './modules/goals/goal.module';
import { UserModule } from './modules/user/user.module';
import { WorkoutModule } from './modules/workout/workout.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WorkoutModule,
    ExerciseModule,
    AuthModule,
    UserModule,
    GoalModule,
  ],
  controllers: [AppController],
  providers:   [AppService],
})
export class AppModule {}
