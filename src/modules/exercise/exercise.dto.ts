import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Category } from '../workout/interfaces/workout.pb';

export class ExerciseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;
}
