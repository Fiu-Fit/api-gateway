import { Controller, Inject, OnModuleInit, UseFilters } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AllGlobalExceptionsFilter } from '../../shared/rpc-exceptions-filter';
import {
  WORKOUT_SERVICE_NAME,
  WorkoutServiceClient,
} from './interfaces/workout.pb';

@UseFilters(AllGlobalExceptionsFilter)
@Controller('workout')
export class WorkoutController implements OnModuleInit {
  @Inject(WORKOUT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  private workoutService: WorkoutServiceClient;

  public onModuleInit(): void {
    this.workoutService =
      this.client.getService<WorkoutServiceClient>(WORKOUT_SERVICE_NAME);
  }
}
