import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ExerciseDto } from './exercise.dto';
import { Exercise, Exercises } from './interfaces/exercise.pb';

@Injectable()
@Controller('exercises')
export class ExerciseController {
  constructor(private httpService: HttpService) {}

  @Post('create')
  create(@Body() exercise: ExerciseDto): Observable<Exercise> {
    return this.httpService
      .post(`${process.env.WORKOUT_SERVICE_URL}/exercises/create`, exercise)
      .pipe(map(res => res.data));
  }

  @Get()
  findAll(): Observable<Exercises> {
    return this.httpService
      .get(`${process.env.WORKOUT_SERVICE_URL}/exercises`)
      .pipe(map(res => res.data));
  }

  @Get(':id')
  findById(@Param('id') id: string): Observable<Exercise> {
    return this.httpService
      .get(`${process.env.WORKOUT_SERVICE_URL}/exercises/${id}`)
      .pipe(map(res => res.data));
  }

  @Put(':id')
  put(
    @Param('id') id: string,
    @Body() exercise: ExerciseDto
  ): Observable<Exercise> {
    return this.httpService
      .put(`${process.env.WORKOUT_SERVICE_URL}/exercises/${id}`, exercise)
      .pipe(map(res => res.data));
  }

  @Delete(':id')
  deleteById(@Param('id') id: string): Observable<Exercise> {
    return this.httpService
      .delete(`${process.env.WORKOUT_SERVICE_URL}/exercises/${id}`)
      .pipe(map(res => res.data));
  }

  @Get('name/:name')
  findByName(@Param('name') name: string): Observable<Exercise> {
    return this.httpService
      .get(`${process.env.WORKOUT_SERVICE_URL}/exercises/name/${name}`)
      .pipe(map(res => res.data));
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string): Observable<Exercise> {
    return this.httpService
      .get(`${process.env.WORKOUT_SERVICE_URL}/exercises/category/${category}`)
      .pipe(map(res => res.data));
  }
}
