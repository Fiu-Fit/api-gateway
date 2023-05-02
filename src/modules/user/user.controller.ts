import { Page } from '@fiu-fit/common';
import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';
import { User } from './interfaces/user.pb';
import { UserDto } from './user.dto';

@Injectable()
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private httpService: HttpService) {}

  @Get()
  findAll(): Observable<Page<User>> {
    // eslint-disable-next-line no-console
    return this.httpService
      .get(`${process.env.USER_SERVICE_URL}/users`)
      .pipe(map(res => res.data));
  }

  @Get(':id')
  findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<User> | Observable<User> | User {
    return this.httpService
      .get(`${process.env.USER_SERVICE_URL}/users/${id}`)
      .pipe(map(res => res.data));
  }

  @Delete(':id')
  deleteById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<User> | Observable<User> | User {
    return this.httpService
      .delete(`${process.env.USER_SERVICE_URL}/users/${id}`)
      .pipe(map(res => res.data));
  }

  @Put(':id')
  put(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserDto
  ): Promise<User> | Observable<User> | User {
    return this.httpService
      .put(`${process.env.USER_SERVICE_URL}/users/${id}`, user)
      .pipe(map(res => res.data));
  }
}
