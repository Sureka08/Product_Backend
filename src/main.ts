import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const normalizeOrigin = (value: string) => value.trim().replace(/\/$/, '');

  const configuredOrigins = (process.env.FRONTEND_URL || '')
    .split(',')
    .map((origin) => normalizeOrigin(origin))
    .filter(Boolean);

  const allowedOrigins = new Set([
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    ...configuredOrigins,
  ]);

  app.enableCors({
    origin: (origin, callback) => {
      // Allow same-origin/server-to-server requests that do not send Origin.
      if (!origin) {
        callback(null, true);
        return;
      }

      const normalizedOrigin = normalizeOrigin(origin);
      const isAllowedVercelPreview = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(
        normalizedOrigin,
      );

      if (allowedOrigins.has(normalizedOrigin) || isAllowedVercelPreview) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = Number(process.env.PORT) || 3001;
  await app.listen(port, '0.0.0.0');

  console.log(`Server running on port ${port}`);
}
bootstrap();