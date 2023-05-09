import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Injectable,
  Post,
  Query,
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

  @Get('search')
  async searchUsers(@Query('query') query: string): Promise<User[]> {
    const response = await firstValueFrom(
      this.httpService
        .get<User[]>(`/users/search?query=${query}`)
        .pipe(catchError(axiosErrorCatcher))
    );
    return response.data;
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
