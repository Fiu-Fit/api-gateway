import { HttpService } from '@nestjs/axios';
import { Controller, Get, Injectable, Query, UseGuards } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { axiosErrorCatcher } from '../../shared/axios-error-catcher';
import { ServerController } from '../../shared/server-controller';
import { AuthGuard } from '../auth/auth.guard';
import { User } from './interfaces/user.interface';

@Injectable()
@UseGuards(AuthGuard)
@Controller('users')
export class UserController extends ServerController {
  constructor(httpService: HttpService) {
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
}
