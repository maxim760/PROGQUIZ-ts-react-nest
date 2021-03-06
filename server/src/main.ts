import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 5000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => {
    console.log("serve starten on", PORT)
  });
}
bootstrap();