import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
  @Prop({ default: uuidv4 })
  notification_id: string;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  device_token: string;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);