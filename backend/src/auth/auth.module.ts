import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { OneMapModule } from '../one-map/one-map.module';
import { jwtConfig } from './auth.config';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.registerAsync(jwtConfig), OneMapModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
