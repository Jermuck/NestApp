import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.get<string>("PORT") || 4000;
  await app.listen(PORT, () => console.log(`Server was started in ${PORT}`));
}
bootstrap();