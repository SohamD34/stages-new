import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './notification.schema';
import { Stage, StageDocument } from '../stages/stage.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    @InjectModel(Stage.name) private stageModel: Model<StageDocument>,
  ) {}

  async registerDevice(userId: string, deviceToken: string): Promise<{ message: string }> {
    const newNotification = new this.notificationModel({
      user_id: userId,
      device_token: deviceToken,
    });
    await newNotification.save();

    return { message: 'Device registered for notifications.' };
  }

  async sendPushNotification(stageId: string, eventType: string, message: string): Promise<{ message: string }> {
    const stage = await this.stageModel.findById(stageId).exec();
    if (!stage) {
      throw new Error('Stage not found');
    }

    const notifications = await this.notificationModel.find({}).exec();
    const deviceTokens = notifications.map(notification => notification.device_token);

    // Here you would integrate with a push notification service like Firebase Cloud Messaging (FCM)
    // For demonstration purposes, we'll just log the device tokens and message
    console.log('Sending push notification to:', deviceTokens);
    console.log('Message:', message);

    return { message: 'Push notifications sent successfully.' };
  }
}