/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ExerciseDto } from '../exercise.dto';

export const protobufPackage = 'exercise';

export interface ExerciseId {
  id: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface Empty {}

export interface Exercises {
  exercises: Exercise[];
}

export interface ExerciseName {
  name: string;
}

export interface ExerciseCategory {
  category: string;
}

export const EXERCISE_PACKAGE_NAME = 'exercise';

export interface ExerciseServiceClient {
  create(request: ExerciseDto): Observable<Exercise>;

  findById(request: ExerciseId): Observable<Exercise>;

  findByName(request: ExerciseName): Observable<Exercise>;

  findByCategory(request: ExerciseCategory): Observable<Exercises>;

  findAll(request: Empty): Observable<Exercises>;

  put(request: Exercise): Observable<Exercise>;

  deleteById(request: ExerciseId): Observable<Exercise>;
}

export interface ExerciseServiceController {
  create(
    request: ExerciseDto
  ): Promise<Exercise> | Observable<Exercise> | Exercise;

  findById(
    request: ExerciseId
  ): Promise<Exercise> | Observable<Exercise> | Exercise;

  findByName(
    request: ExerciseName
  ): Promise<Exercise> | Observable<Exercise> | Exercise;

  findByCategory(
    request: ExerciseCategory
  ): Promise<Exercises> | Observable<Exercises> | Exercises;

  findAll(
    request: Empty
  ): Promise<Exercises> | Observable<Exercises> | Exercises;

  put(request: Exercise): Promise<Exercise> | Observable<Exercise> | Exercise;

  deleteById(
    request: ExerciseId
  ): Promise<Exercise> | Observable<Exercise> | Exercise;
}

export function ExerciseServiceControllerMethods() {
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
      GrpcMethod('ExerciseService', method)(
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
      GrpcStreamMethod('ExerciseService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const EXERCISE_SERVICE_NAME = 'ExerciseService';
