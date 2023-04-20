import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { WorkoutModule } from './modules/workout/workout.module';

@Module({
  imports:     [ConfigModule.forRoot(), UserModule, AuthModule, WorkoutModule],
  controllers: [AppController],
  providers:   [AppService],
})
export class AppModule {}
