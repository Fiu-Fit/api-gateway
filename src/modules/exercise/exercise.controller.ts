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
  EXERCISE_SERVICE_NAME,
  Exercise,
  ExerciseDto,
  ExerciseList,
  ExerciseServiceClient,
} from './interfaces/exercise.pb';

@UseFilters(AllGlobalExceptionsFilter)
@Controller('exercises')
export class ExerciseController implements OnModuleInit {
  @Inject(EXERCISE_SERVICE_NAME)
  private readonly client: ClientGrpc;

  private exerciseService: ExerciseServiceClient;

  public onModuleInit(): void {
    this.exerciseService = this.client.getService<ExerciseServiceClient>(
      EXERCISE_SERVICE_NAME
    );
  }

  @Post('create')
  create(
    @Body() exercise: ExerciseDto
  ): Promise<Exercise> | Observable<Exercise> | Exercise {
    return this.exerciseService.create(exercise);
  }

  @Get('/')
  findAll(): Observable<ExerciseList> {
    return this.exerciseService.findAll({});
  }

  @Get(':id')
  findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Exercise> | Observable<Exercise> | Exercise {
    return this.exerciseService.findById({ id });
  }

  @Put(':id')
  put(
    @Body() exercise: ExerciseDto
  ): Promise<Exercise> | Observable<Exercise> | Exercise {
    return this.exerciseService.put(exercise);
  }

  @Delete(':id')
  deleteById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Exercise> | Observable<Exercise> | Exercise {
    return this.exerciseService.deleteById({ id });
  }
}
