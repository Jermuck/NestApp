import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { config } from "./infrastructure/config/typeormconfig/typeorm.config"
@Module({
  imports: [
    TypeOrmModule.forRoot(config)
  ],
  controllers: [AppController],
})
export class AppModule {}
