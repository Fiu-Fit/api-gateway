import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
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
@Controller('workouts')
export class WorkoutController implements OnModuleInit {
  @Inject(WORKOUT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  private workoutService: WorkoutServiceClient;

  public onModuleInit(): void {
    this.workoutService =
      this.client.getService<WorkoutServiceClient>(WORKOUT_SERVICE_NAME);
  }

  @Get('/')
  findAll(): Observable<WorkoutList> {
    return this.workoutService.findAll({});
  }

  @Post('create')
  create(
    @Body() workout: WorkoutDto
  ): Promise<Workout> | Observable<Workout> | Workout {
    return this.workoutService.create(workout);
  }

  @Get(':id')
  findById(
    @Param('id') id: string
  ): Promise<Workout> | Observable<Workout> | Workout {
    return this.workoutService.findById({ id });
  }

  @Delete(':id')
  deleteById(
    @Param('id') id: string
  ): Promise<Workout> | Observable<Workout> | Workout {
    return this.workoutService.deleteById({ id });
  }

  @Get('name/:name')
  findByName(
    @Param('name') name: string
  ): Promise<Workout> | Observable<Workout> | Workout {
    return this.workoutService.findByName({ name });
  }

  @Get('category/:category')
  findByCategory(
    @Param('category') category: string
  ): Promise<WorkoutList> | Observable<WorkoutList> | WorkoutList {
    return this.workoutService.findByCategory({ category });
  }

  @Get('exerciseId/:exerciseId')
  findByExerciseId(
    @Param('exerciseId') exerciseId: string
  ): Promise<WorkoutList> | Observable<WorkoutList> | WorkoutList {
    return this.workoutService.findByExerciseId({ exerciseId });
  }

  @Put(':id')
  put(
    @Param('id') id: string,
    @Body() workout: Workout
  ): Promise<Workout> | Observable<Workout> | Workout {
    return this.workoutService.put({ id, workout });
  }
}
