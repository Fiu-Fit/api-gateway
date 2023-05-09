import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Injectable,
  Post,
  UseGuards,
} from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { axiosErrorCatcher } from '../../shared/axios-error-catcher';
import { ServerController } from '../../shared/server-controller';
import { AuthGuard } from '../auth/auth.guard';
import { User } from './interfaces/user.interface';

@Injectable()
@UseGuards(AuthGuard)
@Controller('users')
export class UserController extends ServerController {
  constructor(protected httpService: HttpService) {
    super(httpService, 'users');
  }

  @Post('me')
  @HttpCode(HttpStatus.OK)
  async getMe(@Headers('Authorization') bearerToken: string): Promise<User> {
    const { data } = await firstValueFrom(
      this.httpService
        .post<User>(
          '/users/me',
          {},
          {
            headers: { Authorization: bearerToken },
          }
        )
        .pipe(catchError(axiosErrorCatcher))
    );
    return data;
  }
}
