import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Post('send')
    sendNotification(@Body() body: { stage_id: string; event_type: string; message: string }) {
        return this.notificationsService.sendNotification(body);
    }
}
