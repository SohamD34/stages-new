import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.gaurd';
import { RegisterDeviceDto } from './registerDevice.dto';
import { sendNotif } from './send-notif.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('register')
  async registerDevice(@Body() registerDeviceDto: RegisterDeviceDto, @Request() req) {
    const userId = req.user.userId;
    return this.notificationsService.registerDevice(userId,registerDeviceDto.deviceToken );
  }

  @Post('send')
  async sendPushNotification(
    @Body() sendNotif: sendNotif
  ) {
    return this.notificationsService.sendPushNotification(sendNotif.stageId, sendNotif.eventType, sendNotif.message);
  }
}