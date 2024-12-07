import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type LikeDocument = Like & Document;

@Schema()
export class Like {
  @Prop({ default: uuidv4 })
  like_id: string;

  @Prop({ required: true })
  stage_id: string;

  @Prop({ required: true })
  user_id: string;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const LikeSchema = SchemaFactory.createForClass(Like);