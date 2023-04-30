import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AuthServiceClient, ValidResponse } from './interfaces/auth.pb';

@Injectable()
export class AuthService {
  private svc: AuthServiceClient;

  public validate(token: string): Promise<ValidResponse> {
    return firstValueFrom(this.svc.validate({ token }));
  }
}
