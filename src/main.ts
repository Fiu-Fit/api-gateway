import { LoggerFactory } from '@fiu-fit/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
// import { firebaseApp } from './modules/auth/firebase';

const logger = LoggerFactory('main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); //  magic line

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = parseInt(process.env.PORT || '8080');
  await app.listen(port);

  // const email = 'test@gmail.com';
  // const password = '123456';

  // const auth = getAuth();
  // createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential: any) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     logger.info('user: ', user);
  //     // ...
  //   })
  //   .catch((error: any) => {
  //     const errorCode = error.code;
  //     logger.error('errorCode: ', errorCode);
  //     const errorMessage = error.message;
  //     logger.error('errorMessage: ', errorMessage);
  //     // ..
  //   });

  logger.info(`App is running on PORT: ${port}`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
