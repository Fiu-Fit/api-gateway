/* eslint-disable */
import { Document } from 'mongoose';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobuffPackage = 'exercise';

export interface ExerciseId {
  id: string;
}

export interface ExerciseName {
  name: string;
}

export interface ExerciseCategory {
  category: string;
}

export interface Exercise {
  name: string;
  description: string;
  category: string;
}

export interface Empty {}

export interface ExerciseList {
  exercises: Exercise[];
}

export interface ExercisePutRequest {
  id: string;
  exercise: Exercise;
}

export interface ExerciseServiceClient {
  create(request: Exercise): Observable<Exercise>;

  findAll(request: Empty): Observable<ExerciseList>;

  findById(request: ExerciseId): Observable<Exercise>;

  put(request: ExercisePutRequest): Observable<Exercise>;

  deleteById(request: ExerciseId): Observable<Exercise>;

  findByName(request: ExerciseName): Observable<Exercise>;

  findByCategory(request: ExerciseCategory): Observable<Exercise>;
}

export interface ExerciseServiceController {
  create(
    request: Exercise
  ): Promise<Exercise> | Observable<Exercise> | Exercise;

  findById(
    request: ExerciseId
  ): Promise<Exercise> | Observable<Exercise> | Exercise;

  findAll(
    request: Empty
  ): Promise<ExerciseList> | Observable<ExerciseList> | ExerciseList;

  put(
    request: ExercisePutRequest
  ): Promise<Exercise> | Observable<Exercise> | Exercise;

  deleteById(
    request: ExerciseId
  ): Promise<Exercise> | Observable<Exercise> | Exercise;

  findByName(
    request: ExerciseName
  ): Promise<Exercise> | Observable<Exercise> | Exercise;

  findByCategory(
    request: ExerciseCategory
  ): Promise<Exercise> | Observable<Exercise> | Exercise;
}

export function ExerciseServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'create',
      'findById',
      'findAll',
      'put',
      'deleteById',
      'getByName',
      'getByCategory',
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
