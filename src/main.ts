import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  const origin: string[] | string = ['*'];
  app.enableCors({ origin, credentials: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config: ConfigService = app.get(ConfigService);
  const port: number = Number(config.get<string>('PORT') || 3000);
  await app.listen(port);
  console.log(`🐬 ~ Server started on port ${port}`);
}
bootstrap();
