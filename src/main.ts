import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT, CLIENT_URL } = process.env;

  const CURRENT_PORT = PORT || 8080;

  app.enableCors({
    credentials: true,
    origin: CLIENT_URL,
  });

  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(new ValidationPipe());

  try {
    await app.listen(CURRENT_PORT, () =>
      console.log(`Running on Port ${CURRENT_PORT}`),
    );
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
