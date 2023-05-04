import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { WorkoutExercise } from './interfaces/workout.pb';

export class WorkoutDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  difficulty: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsOptional()
  exercises: WorkoutExercise[] = [];

  @IsOptional()
  athleteIds: number[];

  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
