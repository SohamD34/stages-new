import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StagesModule } from './stages/stages.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [AuthModule, StagesModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
