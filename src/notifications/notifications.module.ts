import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { Notification, NotificationSchema } from './notification.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { Stage, StageSchema } from 'src/stages/stage.schema';
@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: 'accessSecret', // Use the same secret as in AuthModule
      signOptions: { expiresIn: '1h' }, // 1 hour expiry for access token
    }),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: Stage.name, schema: StageSchema },
    ]),
    ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}