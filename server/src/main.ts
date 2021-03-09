import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 5000;

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, '0.0.0.0', () => {
    console.log('serve starten on', PORT);
  });
}
bootstrap();
