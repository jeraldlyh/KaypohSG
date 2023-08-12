import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as firebase from 'firebase-admin';
import { AppModule } from './app/app.module';
import { WEB_URL } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const serviceAccount: firebase.ServiceAccount = {
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    privateKey: configService
      .get<string>('FIREBASE_PRIVATE_KEY')
      .replace(/\\n/g, '\n'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };

  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });
  firebase.firestore().settings({ ignoreUndefinedProperties: true });

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: WEB_URL,
  });
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
