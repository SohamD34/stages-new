import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';  // Importing from @nestjs/mongoose
import { ObjectId, HydratedDocument } from 'mongoose';

export type StageDocument = HydratedDocument<Stage>;

// Define the Stage schema using the NestJS decorator
@Schema()
export class Stage{
  @Prop({ required: true })
  stageName: string;

  @Prop({ required: true })
  scheduledTime: Date;

  @Prop({ required: true })
  hostUserId: string;

  @Prop({ default: 'scheduled' })
  status: string;
}

// Define the Mongoose Schema
export const StageSchema = SchemaFactory.createForClass(Stage);

// module.exports = mongoose.model("User", UserSchema);
