import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { Role } from './interfaces/user.pb';

export class UserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  lastName: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
