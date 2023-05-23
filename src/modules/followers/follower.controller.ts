import { User } from '@fiu-fit/common';
import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { axiosErrorCatcher } from '../../shared/axios-error-catcher';
import { ServerController } from '../../shared/server-controller';
import { AuthGuard } from '../auth/auth.guard';

@Injectable()
@UseGuards(AuthGuard)
@Controller('followers')
export class FollowerController extends ServerController {
  constructor(protected httpService: HttpService) {
    super(httpService, 'followers');
  }

  @Post('follow')
  async followUser(
    @Query('id') id: number,
    @Body('userIdToFollow') userIdToFollow: number
  ) {
    const { data } = await firstValueFrom(
      this.httpService
        .post('/followers/follow', { userIdToFollow }, { params: { id } })
        .pipe(catchError(axiosErrorCatcher))
    );
    return data;
  }

  @Delete('unfollow')
  async unfollowUser(
    @Query('id') id: number,
    @Query('followerId') followerId: number
  ) {
    const { data } = await firstValueFrom(
      this.httpService
        .delete<User>('/followers/unfollow', { params: { id, followerId } })
        .pipe(catchError(axiosErrorCatcher))
    );
    return data;
  }

  @Get('followers')
  async getFollowers(@Query('id') id: number): Promise<User[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<User[]>('/followers/followers', { params: { id } })
        .pipe(catchError(axiosErrorCatcher))
    );
    return data;
  }

  @Get('following')
  async getFollowing(@Query('id') id: number): Promise<User[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<User[]>('/followers/following', { params: { id } })
        .pipe(catchError(axiosErrorCatcher))
    );
    return data;
  }
}
