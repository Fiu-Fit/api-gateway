import { IsNotEmpty, IsString } from 'class-validator';

export class ExerciseDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsString()
  category?: string;
}
