import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import "dotenv/config"

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: process.env.JWTSECRET
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
