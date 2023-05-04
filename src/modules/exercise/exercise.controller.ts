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
import { ExerciseDto } from './exercise.dto';
import { Exercise } from './interfaces/exercise.pb';

@Injectable()
@Controller('exercises')
export class ExerciseController {
  constructor(private httpService: HttpService) {}

  @Post()
  async create(@Body() exercise: ExerciseDto): Promise<Exercise> {
    const { data } = await firstValueFrom(
      this.httpService.post<Exercise>('/exercises', exercise).pipe(
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
  async findAll(): Promise<Exercise[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Exercise[]>('/exercises').pipe(
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
  async findById(@Param('id') id: string): Promise<Exercise> {
    const { data } = await firstValueFrom(
      this.httpService.get<Exercise>(`/exercises/${id}`).pipe(
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
    @Body() exercise: ExerciseDto
  ): Promise<Exercise> {
    const { data } = await firstValueFrom(
      this.httpService.put<Exercise>(`/exercises/${id}`, exercise).pipe(
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
  async deleteById(@Param('id') id: string): Promise<Exercise> {
    const { data } = await firstValueFrom(
      this.httpService.delete<Exercise>(`/exercises/${id}`).pipe(
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
  async findByName(@Param('name') name: string): Promise<Exercise> {
    const { data } = await firstValueFrom(
      this.httpService.get<Exercise>(`/exercises/name/${name}`).pipe(
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
  async findByCategory(@Param('category') category: string): Promise<Exercise> {
    const { data } = await firstValueFrom(
      this.httpService.get<Exercise>(`/exercises/category/${category}`).pipe(
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
