import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeormModule } from './infrastructure/config/typeorm/typeorm.module';
import { ControllersModule } from './infrastructure/controllers/controller.module';

@Module({
  imports:[ControllersModule, TypeormModule],
  controllers: [AppController],
})
export class AppModule {};
