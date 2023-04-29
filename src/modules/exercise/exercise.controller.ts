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
import { ExerciseDto } from './exercise.dto';
import {
  EXERCISE_SERVICE_NAME,
  Exercise,
  ExerciseServiceClient,
  Exercises,
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

  @Post()
  create(
    @Body() exercise: ExerciseDto
  ): Promise<Exercise> | Observable<Exercise> | Exercise {
    return this.exerciseService.create(exercise);
  }

  @Get()
  findAll(): Observable<Exercises> {
    return this.exerciseService.findAll({});
  }

  @Get(':id')
  findById(
    @Param('id') id: string
  ): Promise<Exercise> | Observable<Exercise> | Exercise {
    return this.exerciseService.findById({ id });
  }

  @Put(':id')
  put(
    @Param('id') id: string,
    @Body() exercise: ExerciseDto
  ): Promise<Exercise> | Observable<Exercise> | Exercise {
    return this.exerciseService.put({
      id,
      ...exercise,
    });
  }

  @Delete(':id')
  deleteById(
    @Param('id') id: string
  ): Promise<Exercise> | Observable<Exercise> | Exercise {
    return this.exerciseService.deleteById({ id });
  }

  @Get('name/:name')
  findByName(
    @Param('name') name: string
  ): Promise<Exercise> | Observable<Exercise> | Exercise {
    return this.exerciseService.findByName({ name });
  }

  @Get('category/:category')
  findByCategory(
    @Param('category') category: string
  ): Promise<Exercises> | Observable<Exercises> | Exercises {
    return this.exerciseService.findByCategory({ category });
  }
}
