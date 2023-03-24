import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { JwtMiddleware } from './auth/jwt.middleware';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  //const jwtService = app.get(JwtService);
  //app.use(new JwtMiddleware(jwtService));
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
