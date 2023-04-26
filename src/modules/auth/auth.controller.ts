import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  OnModuleInit,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AllGlobalExceptionsFilter } from '../../shared/rpc-exceptions-filter';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  LoginRequest,
  RegisterRequest,
  Token,
  ValidResponse,
} from './interfaces/auth.pb';

@UseFilters(AllGlobalExceptionsFilter)
@Controller('auth')
export class AuthController implements OnModuleInit {
  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  private authService: AuthServiceClient;

  public onModuleInit(): void {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
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

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  validate(@Body() token: Token): Observable<ValidResponse> {
    return this.authService.validate(token);
  }
}
