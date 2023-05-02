import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Workout, Workouts } from './interfaces/workout.pb';
import { WorkoutDto } from './workout.dto';

@Injectable()
@Controller('workouts')
export class WorkoutController {
  constructor(private httpService: HttpService) {}

  @Get()
  findAll(): Observable<Workouts> {
    return this.httpService
      .get(`${process.env.WORKOUT_SERVICE_URL}/workouts`)
      .pipe(map(res => res.data));
  }

  @Post()
  create(@Body() workout: WorkoutDto): Observable<Workout> {
    return this.httpService
      .post(`${process.env.WORKOUT_SERVICE_URL}/workouts/create`, workout)
      .pipe(map(res => res.data));
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Observable<Workout> {
    return this.httpService
      .get(`${process.env.WORKOUT_SERVICE_URL}/workouts/${id}`)
      .pipe(map(res => res.data));
  }

  @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number): Observable<Workout> {
    return this.httpService
      .delete(`${process.env.WORKOUT_SERVICE_URL}/workouts/${id}`)
      .pipe(map(res => res.data));
  }

  @Get('name/:name')
  findByName(@Param('name') name: string): Observable<Workout> {
    return this.httpService
      .get(`${process.env.WORKOUT_SERVICE_URL}/workouts/name/${name}`)
      .pipe(map(res => res.data));
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string): Observable<Workout> {
    return this.httpService
      .get(`${process.env.WORKOUT_SERVICE_URL}/workouts/category/${category}`)
      .pipe(map(res => res.data));
  }

  @Put(':id')
  put(
    @Param('id', ParseIntPipe) id: number,
    @Body() exercise: WorkoutDto
  ): Observable<Workout> {
    return this.httpService
      .put(`${process.env.WORKOUT_SERVICE_URL}/workouts/${id}`, exercise)
      .pipe(map(res => res.data));
  }
}