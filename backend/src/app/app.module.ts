import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { ContributionModule } from '../contribution/contribution.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ContributionModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
