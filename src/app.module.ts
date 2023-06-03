import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infrastructure/controllers/auth/auth.module';
import { FriendsModule } from "./infrastructure/controllers/friends/friends.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./env/.env"
    }),
    AuthModule,
    FriendsModule
  ],
})
export class AppModule { };
