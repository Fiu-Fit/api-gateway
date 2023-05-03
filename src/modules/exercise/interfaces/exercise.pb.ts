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
