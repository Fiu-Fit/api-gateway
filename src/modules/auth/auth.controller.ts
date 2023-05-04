import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import {
  LoginRequest,
  RegisterRequest,
  Token,
  ValidResponse,
} from './interfaces/auth.pb';

@Injectable()
@Controller('auth')
export class AuthController {
  constructor(private httpService: HttpService) {}

  @Post('login')
  async login(@Body() loginRequest: LoginRequest): Promise<Token> {
    const { data } = await firstValueFrom(
      this.httpService.post<Token>('/auth/login', loginRequest).pipe(
        catchError((err: AxiosError) => {
          if (err.response) {
            throw new HttpException(
              err.response.data as string,
              err.response.status
            );
          }
          throw new HttpException(
            err.message,
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        })
      )
    );
    return data;
  }

  @Post('register')
  async register(@Body() newUser: RegisterRequest): Promise<Token> {
    const { data } = await firstValueFrom(
      this.httpService.post<Token>('auth/register', newUser).pipe(
        catchError((err: AxiosError) => {
          if (err.response) {
            throw new HttpException(
              err.response.data as string,
              err.response.status
            );
          }
          throw new HttpException(
            err.message,
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        })
      )
    );
    return data;
  }

  @Post('logout')
  async logout(): Promise<Token> {
    const { data } = await firstValueFrom(
      this.httpService.post<Token>('auth/logout').pipe(
        catchError((err: AxiosError) => {
          if (err.response) {
            throw new HttpException(
              err.response.data as string,
              err.response.status
            );
          }
          throw new HttpException(
            err.message,
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        })
      )
    );
    return data;
  }

  @Post('validate')
  async validate(@Body() token: Token): Promise<ValidResponse> {
    const { data } = await firstValueFrom(
      this.httpService.post<ValidResponse>('/auth/validate', token).pipe(
        catchError((err: AxiosError) => {
          if (err.response) {
            throw new HttpException(
              err.response.data as string,
              err.response.status
            );
          }
          throw new HttpException(
            err.message,
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        })
      )
    );
    return data;
  }
}
