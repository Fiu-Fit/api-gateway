import { Category } from '../../workout/interfaces/workout.pb';

export interface ExerciseId {
  id: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: Category;
}

export interface Empty {}
