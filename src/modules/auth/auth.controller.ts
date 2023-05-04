import { HttpService } from '@nestjs/axios';
import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { axiosErrorCatcher } from '../../shared/axios-error-catcher';
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
      this.httpService
        .post<Token>('/auth/login', loginRequest)
        .pipe(catchError(axiosErrorCatcher))
    );
    return data;
  }

  @Post('register')
  async register(@Body() newUser: RegisterRequest): Promise<Token> {
    const { data } = await firstValueFrom(
      this.httpService
        .post<Token>('auth/register', newUser)
        .pipe(catchError(axiosErrorCatcher))
    );
    return data;
  }

  @Post('logout')
  async logout(): Promise<Token> {
    const { data } = await firstValueFrom(
      this.httpService
        .post<Token>('auth/logout')
        .pipe(catchError(axiosErrorCatcher))
    );
    return data;
  }

  @Post('validate')
  async validate(@Body() token: Token): Promise<ValidResponse> {
    const { data } = await firstValueFrom(
      this.httpService
        .post<ValidResponse>('/auth/validate', token)
        .pipe(catchError(axiosErrorCatcher))
    );
    return data;
  }
}
