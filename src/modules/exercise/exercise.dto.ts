import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ExerciseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
