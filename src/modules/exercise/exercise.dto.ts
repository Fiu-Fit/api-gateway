import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ExerciseDTO {
  @IsNumber()
  id?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsString()
  category?: string;
}
