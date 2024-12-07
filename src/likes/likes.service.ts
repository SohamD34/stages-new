import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like, LikeDocument } from './likes.schema';
import { Stage, StageDocument } from '../stages/stage.schema';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
    @InjectModel(Stage.name) private stageModel: Model<StageDocument>,
  ) {}

  async likeStage(stageId: string, userId: string): Promise<{ message: string; likes_count: number }> {
    const newLike = new this.likeModel({
      stage_id: stageId,
      user_id: userId,
    });
    await newLike.save();

    const likesCount = await this.likeModel.countDocuments({ stage_id: stageId });

    return {
      message: 'Stage liked successfully.',
      likes_count: likesCount,
    };
  }
}