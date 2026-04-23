import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Support multiple origins via comma-separated FRONTEND_URL
  const allowedOrigins = [
    ...(process.env.FRONTEND_URL?.split(',').map(origin => origin.trim()) || []),
    'http://localhost:3000',
    'http://localhost:3002',
  ].filter((origin): origin is string => Boolean(origin));

  console.log('CORS allowed origins:', allowedOrigins);

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT || 3001);
}
bootstrap();