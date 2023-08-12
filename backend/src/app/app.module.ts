import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { ContributionModule } from '../contribution/contribution.module';
import { OneMapModule } from '../one-map/one-map.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ContributionModule,
    OneMapModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
