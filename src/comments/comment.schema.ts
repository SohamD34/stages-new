import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ default: uuidv4 })
  comment_id: string;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  comment_text: string;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);