import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AllGlobalExceptionsFilter } from '../../shared/rpc-exceptions-filter';
import {
  AuthServiceClient,
  LoginRequest,
  RegisterRequest,
  Token,
} from './interfaces/auth.pb';

@UseFilters(AllGlobalExceptionsFilter)
@Controller('auth')
export class AuthController {
  private authService: AuthServiceClient;

  @Post('login')
  login(
    @Body() loginRequest: LoginRequest
  ): Promise<Token> | Observable<Token> | Token {
    return this.authService.login(loginRequest);
  }

  @Post('register')
  register(
    @Body() newUser: RegisterRequest
  ): Promise<Token> | Observable<Token> | Token {
    return this.authService.register(newUser);
  }

  @Post('logout')
  logout() {
    return this.authService.logout({});
  }
}
