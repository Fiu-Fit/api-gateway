/* eslint-disable */
import { Observable } from 'rxjs';
import { ExerciseDto } from '../exercise.dto';

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
