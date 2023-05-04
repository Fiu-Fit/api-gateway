import { LoggerFactory } from '@fiu-fit/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { firebaseAdmin } from '../../firebase/firebase';

const logger = LoggerFactory('AuthGuard');

@Injectable()
export class AuthGuard implements CanActivate {
  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
      logger.info('token: ', decodedToken);
      request.user = decodedToken;
      return true;
    } catch (err) {
      logger.info(`Error verifying token: ${err}`);
      return false;
    }
  }
}
