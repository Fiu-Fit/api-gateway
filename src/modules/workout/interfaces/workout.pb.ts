/* eslint-disable */
import { Observable } from 'rxjs';
import { WorkoutDto } from '../workout.dto';

export enum Units {
  SECONDS = 0,
  MINUTES = 1,
  HOURS = 2,
  REPETITIONS = 3,
  METERS = 4,
  KILOMETERS = 5,
  UNRECOGNIZED = -1,
}

export interface WorkoutId {
  id: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: number;
  category: string;
  exercises: WorkoutExercise[];
  athleteIds: number[];
  authorId: number;
}

export interface WorkoutExercise {
  exerciseId: string;
  repetitions: number;
  units: Units;
}

export interface Empty {}

export interface Workouts {
  workouts: Workout[];
}

export interface WorkoutName {
  name: string;
}

export interface WorkoutCategory {
  category: string;
}

export interface ExerciseId {
  exerciseId: string;
}

export interface WorkoutServiceClient {
  create(request: WorkoutDto): Observable<Workout>;

  findById(request: WorkoutId): Observable<Workout>;

  findByCategory(request: WorkoutCategory): Observable<Workouts>;

  findByName(request: WorkoutName): Observable<Workout>;

  findByExerciseId(request: ExerciseId): Observable<Workouts>;

  findAll(request: Empty): Observable<Workouts>;

  put(request: Workout): Observable<Workout>;

  deleteById(request: WorkoutId): Observable<Workout>;
}

export interface WorkoutServiceController {
  create(request: WorkoutDto): Promise<Workout> | Observable<Workout> | Workout;

  findById(
    request: WorkoutId
  ): Promise<Workout> | Observable<Workout> | Workout;

  findByCategory(
    request: WorkoutCategory
  ): Promise<Workouts> | Observable<Workouts> | Workouts;

  findByName(
    request: WorkoutName
  ): Promise<Workout> | Observable<Workout> | Workout;

  findByExerciseId(
    request: ExerciseId
  ): Promise<Workouts> | Observable<Workouts> | Workouts;

  findAll(request: Empty): Promise<Workouts> | Observable<Workouts> | Workouts;

  put(request: Workout): Promise<Workout> | Observable<Workout> | Workout;

  deleteById(
    request: WorkoutId
  ): Promise<Workout> | Observable<Workout> | Workout;
}