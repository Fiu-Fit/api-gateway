/* eslint-disable no-console */
import { HttpService } from '@nestjs/axios';
import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { LoginRequest, RegisterRequest, Token } from './interfaces/auth.pb';

@Injectable()
@Controller('auth')
export class AuthController {
  constructor(private httpService: HttpService) {}

  @Post('login')
  login(@Body() loginRequest: LoginRequest): Observable<Token> {
    return this.httpService
      .post(`${process.env.USER_SERVICE_URL}/auth/login`, loginRequest)
      .pipe(map(res => res.data));
  }

  @Post('register')
  register(@Body() newUser: RegisterRequest): Observable<Token> {
    return this.httpService
      .post(`${process.env.USER_SERVICE_URL}/auth/register`, newUser)
      .pipe(map(res => res.data));
  }

  @Post('logout')
  logout(): Observable<Token> {
    return this.httpService
      .post(`${process.env.USER_SERVICE_URL}/auth/logout`)
      .pipe(map(res => res.data));
  }

  /*
  @Post('validate')
  validate(@Body() token: Token): Observable<ValidResponse> {
    return this.authService.validate(token);
  }*/
}
