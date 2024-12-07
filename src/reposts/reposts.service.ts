import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repost, RepostDocument } from './repost.schema';
import { Stage, StageDocument } from '../stages/stage.schema';

@Injectable()
export class RepostsService {
  constructor(
    @InjectModel(Repost.name) private repostModel: Model<RepostDocument>,
    @InjectModel(Stage.name) private stageModel: Model<StageDocument>,
  ) {}

  async repostStage(stageId: string, userId: string, message: string): Promise<{ message: string; reposts_count: number }> {
    const newRepost = new this.repostModel({
      stage_id: stageId,
      user_id: userId,
      message,
    });
    await newRepost.save();

    const repostsCount = await this.repostModel.countDocuments({ stage_id: stageId });

    return {
      message: 'Stage reposted successfully.',
      reposts_count: repostsCount,
    };
  }
}