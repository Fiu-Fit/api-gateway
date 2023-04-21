import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AllGlobalExceptionsFilter } from '../../shared/rpc-exceptions-filter';
import {
  WORKOUT_SERVICE_NAME,
  Workout,
  WorkoutDto,
  WorkoutList,
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

  @Post('create')
  create(
    @Body() workout: WorkoutDto
  ): Promise<Workout> | Observable<Workout> | Workout {
    return this.workoutService.create(workout);
  }

  @Get()
  findAll(): Observable<WorkoutList> {
    return this.workoutService.findAll({});
  }

  @Delete(':id')
  deleteById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Workout> | Observable<Workout> | Workout {
    return this.workoutService.deleteById({ id });
  }

  @Get(':id')
  findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Workout> | Observable<Workout> | Workout {
    return this.workoutService.findById({ id });
  }

  @Put(':id')
  put(
    @Param('id', ParseIntPipe) id: number,
    @Body() workout: WorkoutDto
  ): Promise<Workout> | Observable<Workout> | Workout {
    return this.workoutService.put({
      id,
      ...workout,
      workout: undefined,
    });
  }
}
