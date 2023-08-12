import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './auth.config';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [HttpModule, JwtModule.registerAsync(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
