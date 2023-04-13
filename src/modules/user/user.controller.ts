import { Page } from '@fiu-fit/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseIntPipe,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AllGlobalExceptionsFilter } from '../../shared/rpc-exceptions-filter';
import { AuthGuard } from '../auth/auth.guard';
import {
  USER_SERVICE_NAME,
  User,
  UserServiceClient,
} from './interfaces/user.pb';
import { UserDto } from './user.dto';

@UseFilters(AllGlobalExceptionsFilter)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController implements OnModuleInit {
  @Inject(USER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  private userService: UserServiceClient;

  public onModuleInit(): void {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  @Get()
  findAll(): Observable<Page<User>> {
    return this.userService.findAll({});
  }

  @Delete(':id')
  deleteById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<User> | Observable<User> | User {
    return this.userService.deleteById({ id });
  }

  @Get(':id')
  findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<User> | Observable<User> | User {
    return this.userService.findById({ id });
  }

  @Put(':id')
  put(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserDto
  ): Promise<User> | Observable<User> | User {
    return this.userService.put({
      id,
      ...user,
    });
  }
}
