import { LoggerFactory } from '@fiu-fit/common';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import admin from '../../firebase/firebase';
import { AuthService } from './auth.service';

const logger = LoggerFactory('AuthGuard');

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AuthService)
  public readonly service: AuthService;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      logger.info('token: ', decodedToken);
      request.user = decodedToken;
      return true;
    } catch (err) {
      logger.info(`Error verifying token: ${err}`);
      return false;
    }
  }
}
