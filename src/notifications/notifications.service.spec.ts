import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './notification.schema';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>) {}

  async registerDevice(userId: string, deviceToken: string): Promise<{ message: string }> {
    const newNotification = new this.notificationModel({
      user_id: userId,
      device_token: deviceToken,
    });
    await newNotification.save();

    return { message: 'Device registered for notifications.' };
  }
}