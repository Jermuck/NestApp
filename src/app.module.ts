import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ControllersModule } from './infrastructure/controllers/controller.module';
import { JwtAdapterModule } from './infrastructure/services/jwt-service/jwt.module';

@Module({
  imports:[ControllersModule, JwtAdapterModule],
  controllers: [AppController],
})
export class AppModule {};
