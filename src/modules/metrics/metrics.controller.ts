import { Page } from '@fiu-fit/common';
import { HttpService } from '@nestjs/axios';
import { Controller, Get, Headers, Query } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { axiosErrorCatcher } from '../../shared/axios-error-catcher';
import { User } from '../user/interfaces/user.interface';

@Controller('metrics')
export class MetricsController {
  constructor(private httpService: HttpService) {}

  @Get('login')
  async getLoginMetrics(
    @Headers('Authorization') authToken: string,
    @Query() filter: { [key: string]: string }
  ) {
    const { data } = await firstValueFrom(
      this.httpService
        .get<Page<User>>('metrics/login', {
          params:  filter,
          headers: { Authorization: authToken },
        })
        .pipe(catchError(axiosErrorCatcher))
    );

    return data;
  }

  @Get('register')
  async getRegisterMetrics(
    @Headers('Authorization') authToken: string,
    @Query() filter: { [key: string]: string }
  ) {
    const { data } = await firstValueFrom(
      this.httpService
        .get<Page<User>>('metrics/register', {
          params:  filter,
          headers: { Authorization: authToken },
        })
        .pipe(catchError(axiosErrorCatcher))
    );

    return data;
  }

  @Get('password-reset')
  async getPasswordResetMetrics(
    @Headers('Authorization') authToken: string,
    @Query() filter: { [key: string]: string }
  ) {
    const { data } = await firstValueFrom(
      this.httpService
        .get<Page<User>>('metrics/password-reset', {
          params:  filter,
          headers: { Authorization: authToken },
        })
        .pipe(catchError(axiosErrorCatcher))
    );

    return data;
  }
}
