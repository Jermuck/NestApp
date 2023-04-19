import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  const PORT = process.env.PORT || 4444;
  await app.listen(PORT, () => {
    console.log(`Listening Port - ${PORT}`)
  });
}
bootstrap();
