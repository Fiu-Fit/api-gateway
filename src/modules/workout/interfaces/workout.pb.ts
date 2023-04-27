/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'workout';

export interface WorkoutId {
  id: string;
}

export interface Workout {
  name: string;
  description: string;
  duration: number;
  category: string;
  athleteIds: number[];
  authorId: number;
}

export interface WorkoutDto {
  name: string;
  description: string;
  duration: number;
  category: string;
  athleteIds: number[];
  authorId: number;
}

export interface Empty {}

export interface WorkoutList {
  workouts: Workout[];
}

export interface WorkoutPutRequest {
  id: string;
  workout: Workout | undefined;
}

export interface WorkoutName {
  name: string;
}

export interface WorkoutCategory {
  category: string;
}

export const WORKOUT_PACKAGE_NAME = 'workout';

export interface WorkoutServiceClient {
  create(request: Workout): Observable<Workout>;

  findById(request: WorkoutId): Observable<Workout>;

  findByName(request: WorkoutName): Observable<Workout>;

  findByCategory(request: WorkoutCategory): Observable<WorkoutList>;

  findAll(request: Empty): Observable<WorkoutList>;

  put(request: WorkoutPutRequest): Observable<Workout>;

  deleteById(request: WorkoutId): Observable<Workout>;
}

export interface WorkoutServiceController {
  create(request: Workout): Promise<Workout> | Observable<Workout> | Workout;

  findById(
    request: WorkoutId
  ): Promise<Workout> | Observable<Workout> | Workout;

  findByName(
    request: WorkoutName
  ): Promise<Workout> | Observable<Workout> | Workout;

  findByCategory(
    request: WorkoutCategory
  ): Promise<WorkoutList> | Observable<WorkoutList> | WorkoutList;

  findAll(
    request: Empty
  ): Promise<WorkoutList> | Observable<WorkoutList> | WorkoutList;

  put(
    request: WorkoutPutRequest
  ): Promise<Workout> | Observable<Workout> | Workout;

  deleteById(
    request: WorkoutId
  ): Promise<Workout> | Observable<Workout> | Workout;
}

export function WorkoutServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'create',
      'findById',
      'findByName',
      'findByCategory',
      'findAll',
      'put',
      'deleteById',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod('WorkoutService', method)(
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
      GrpcStreamMethod('WorkoutService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const WORKOUT_SERVICE_NAME = 'WorkoutService';
