import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  WORKOUT_SERVICE_NAME,
  WorkoutServiceClient,
} from './interfaces/workout.pb';

@Injectable()
export class WorkoutService implements OnModuleInit {
  private svc: WorkoutServiceClient;

  @Inject(WORKOUT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc =
      this.client.getService<WorkoutServiceClient>(WORKOUT_SERVICE_NAME);
  }
}
