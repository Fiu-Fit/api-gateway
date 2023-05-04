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

export interface ExerciseId {
  exerciseId: string;
}
