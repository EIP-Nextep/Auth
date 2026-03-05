import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.use(helmet());

  app.enableCors({
    origin: process.env.GATEWAY_URL || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT || 3001);
}

bootstrap();
