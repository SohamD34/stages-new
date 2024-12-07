import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type RepostDocument = Repost & Document;

@Schema()
export class Repost {
  @Prop({ default: uuidv4 })
  repost_id: string;

  @Prop({ required: true })
  stage_id: string;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const RepostSchema = SchemaFactory.createForClass(Repost);