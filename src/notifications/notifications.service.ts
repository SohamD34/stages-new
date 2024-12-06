import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
    sendNotification(data: { stage_id: string; event_type: string; message: string }) {
        // Mock notification logic
        return { message: 'Notification sent successfully.' };
    }
}
