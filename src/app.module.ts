import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ControllersModule } from './infrastructure/controllers/controller.module';

@Module({
  imports:[ControllersModule],
  controllers: [AppController],
})
export class AppModule {};
