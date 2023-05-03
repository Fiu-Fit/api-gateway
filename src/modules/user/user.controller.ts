import { Page } from '@fiu-fit/common';
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
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';
import { User } from './interfaces/user.pb';
import { UserDto } from './user.dto';

@Injectable()
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private httpService: HttpService) {}

  @Get()
  async findAll(): Promise<Page<User>> {
    const { data } = await firstValueFrom(
      this.httpService.get<Page<User>>('/users').pipe(
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
  async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const { data } = await firstValueFrom(
      this.httpService.get<User>(`/users/${id}`).pipe(
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
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const { data } = await firstValueFrom(
      this.httpService.delete<User>(`/users/${id}`).pipe(
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
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserDto
  ): Promise<User> {
    const { data } = await firstValueFrom(
      this.httpService.put<User>(`/users/${id}`, user).pipe(
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
