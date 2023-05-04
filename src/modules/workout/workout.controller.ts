import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Workout } from './interfaces/workout.pb';
import { WorkoutDto } from './workout.dto';

@Injectable()
@Controller('workouts')
export class WorkoutController {
  constructor(private httpService: HttpService) {}

  @Post()
  async create(@Body() workout: WorkoutDto): Promise<Workout> {
    const { data } = await firstValueFrom(
      this.httpService.post<Workout>('/workouts', workout).pipe(
        catchError((err: AxiosError) => {
          if (err.response) {
            throw new HttpException(
              err.response.data as string,
              err.response.status
            );
          }
          throw new HttpException(
            err.message,
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        })
      )
    );
    return data;
  }

  @Get()
  async findAll(): Promise<Workout[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Workout[]>('/workouts').pipe(
        catchError((err: AxiosError) => {
          if (err.response) {
            throw new HttpException(
              err.response.data as string,
              err.response.status
            );
          }
          throw new HttpException(
            err.message,
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        })
      )
    );
    return data;
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Workout> {
    const { data } = await firstValueFrom(
      this.httpService.get<Workout>(`/workouts/${id}`).pipe(
        catchError((err: AxiosError) => {
          if (err.response) {
            throw new HttpException(
              err.response.data as string,
              err.response.status
            );
          }
          throw new HttpException(
            err.message,
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        })
      )
    );
    return data;
  }

  @Put(':id')
  async put(
    @Param('id') id: string,
    @Body() workout: WorkoutDto
  ): Promise<Workout> {
    const { data } = await firstValueFrom(
      this.httpService.put<Workout>(`/workouts/${id}`, workout).pipe(
        catchError((err: AxiosError) => {
          if (err.response) {
            throw new HttpException(
              err.response.data as string,
              err.response.status
            );
          }
          throw new HttpException(
            err.message,
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        })
      )
    );
    return data;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<Workout> {
    const { data } = await firstValueFrom(
      this.httpService.delete<Workout>(`/workouts/${id}`).pipe(
        catchError((err: AxiosError) => {
          if (err.response) {
            throw new HttpException(
              err.response.data as string,
              err.response.status
            );
          }
          throw new HttpException(
            err.message,
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        })
      )
    );
    return data;
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<Workout> {
    const { data } = await firstValueFrom(
      this.httpService.get<Workout>(`/workouts/name/${name}`).pipe(
        catchError((err: AxiosError) => {
          if (err.response) {
            throw new HttpException(
              err.response.data as string,
              err.response.status
            );
          }
          throw new HttpException(
            err.message,
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        })
      )
    );
    return data;
  }

  @Get('category/:category')
  async findByCategory(@Param('category') category: string): Promise<Workout> {
    const { data } = await firstValueFrom(
      this.httpService.get<Workout>(`/workouts/category/${category}`).pipe(
        catchError((err: AxiosError) => {
          if (err.response) {
            throw new HttpException(
              err.response.data as string,
              err.response.status
            );
          }
          throw new HttpException(
            err.message,
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        })
      )
    );
    return data;
  }
}
