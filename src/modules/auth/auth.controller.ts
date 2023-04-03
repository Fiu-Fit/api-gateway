import {
  Body,
  Controller,
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
  AuthServiceController,
  RegisterRequest,
  Token,
  ValidResponse,
} from './interfaces/auth.pb';

@UseFilters(AllGlobalExceptionsFilter)
@Controller('auth')
export class AuthController implements OnModuleInit, AuthServiceController {
  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  private authService: AuthServiceClient;

  public onModuleInit(): void {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('register')
  register(
    @Body() request: RegisterRequest
  ): Promise<Token> | Observable<Token> | Token {
    console.log('register', request);
    return this.authService.register(request);
  }

  @Post('login')
  login(
    @Body() request: RegisterRequest
  ): Promise<Token> | Observable<Token> | Token {
    return this.authService.login(request);
  }

  @Post('validate')
  validate(
    @Body() request: Token
  ): Promise<ValidResponse> | Observable<ValidResponse> | ValidResponse {
    return this.authService.validate(request);
  }
}
