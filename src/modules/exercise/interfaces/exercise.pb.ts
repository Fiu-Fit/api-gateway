/* eslint-disable */
import { Document } from 'mongoose';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobuffPackage = 'exercise';

export interface ExerciseId {
  id: number;
}

export interface Exercise extends Document {
  id: number;
  name: string;
  description: string;
  category: string;
}

export interface ExerciseDto {
  id: number;
  name: string;
  description: string;
  category: string;
}

export interface Empty {}

export interface ExerciseList {
  exercises: Exercise[];
}

export interface ExerciseServiceClient {
  create(request: ExerciseDto): Observable<Exercise>;

  findAll(request: Empty): Observable<ExerciseList>;

  findById(request: ExerciseId): Observable<Exercise>;

  put(request: ExerciseDto): Observable<Exercise>;

  deleteById(request: ExerciseId): Observable<Exercise>;
}

export interface ExerciseServiceController {
  create(
    request: ExerciseDto
  ): Promise<Exercise> | Observable<Exercise> | Exercise;

  findById(
    request: ExerciseId
  ): Promise<Exercise> | Observable<Exercise> | Exercise;

  findAll(
    request: Empty
  ): Promise<ExerciseList> | Observable<ExerciseList> | ExerciseList;

  put(
    request: ExerciseDto
  ): Promise<Exercise> | Observable<Exercise> | Exercise;

  deleteById(
    request: ExerciseId
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
