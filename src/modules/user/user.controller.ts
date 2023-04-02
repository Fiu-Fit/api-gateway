import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
  User,
  UserService,
} from './interfaces/user.interfaces';

@Controller('users')
export class UserController implements OnModuleInit {
  @Inject(USER_PACKAGE_NAME)
  private readonly client: ClientGrpc;

  private userService: UserService;

  public onModuleInit(): void {
    this.userService = this.client.getService<UserService>(USER_SERVICE_NAME);
  }

  // @Get(':id')
  // async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
  //   const user = await this.userService.getUserById(id);
  //   if (!user) {
  //     throw new NotFoundException({
  //       message: 'Usuario con el id proveido no fue encontrado',
  //     });
  //   }
  //   return user;
  // }

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll({});
  }

  // @Patch(':id')
  // editUser(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() user: Partial<UserDto>
  // ): Promise<User> {
  //   return this.userService.editUser(id, user);
  // }
  //
  // @Put(':id')
  // putEditUser(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() user: UserDto
  // ): Promise<User> {
  //   return this.userService.editUser(id, user);
  // }
  //
  // @Delete(':id')
  // deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
  //   return this.userService.deleteUser(id);
  // }
}
