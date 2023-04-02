/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserDto } from '../user.dto';

export interface Page<T> {
  count: number;
  rows: T[];
}

export const protobufPackage = 'user';

export enum Role {
  Admin = 0,
  Athlete = 1,
  Trainer = 2,
  UNRECOGNIZED = -1,
}

export const RoleEnumToName = {
  0: 'Admin',
  1: 'Athlete',
  2: 'Trainer',
};

export const RoleNameToEnum: Record<string, number> = {
  Admin: 0,
  Athlete: 1,
  Trainer: 2,
};

export interface UserServiceController {
  findById(id: number): Promise<User> | Observable<User> | User;

  findAll(): Promise<UserPages> | Observable<UserPages> | UserPages;

  put(id: number, user: UserDto): Promise<User> | Observable<User> | User;

  deleteById(id: number): Promise<User> | Observable<User> | User;
}
export interface UserId {
  id: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

export interface Empty {}

export interface UserPages {
  rows: User[];
  count: number;
}

export const USER_PACKAGE_NAME = 'user';

export interface UserServiceClient {
  findById(request: UserId): Observable<User>;

  findAll(request: Empty): Observable<UserPages>;

  put(request: User): Observable<User>;

  deleteById(request: UserId): Observable<User>;
}
export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findById', 'findAll', 'put', 'deleteById'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const USER_SERVICE_NAME = 'UserService';
