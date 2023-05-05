import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import { RepositoryModule } from './infrastructure/repositories/repository.module';
import { AuthModule } from './infrastructure/controllers/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: "./env/.env"
    }),
    AuthModule
  ],
})
export class AppModule { };
