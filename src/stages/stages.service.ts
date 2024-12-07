import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stage, StageDocument } from './stage.schema';  // Import the interface for typing

@Injectable()
export class StagesService {
  constructor(
    @InjectModel(Stage.name) private stageModel: Model<Stage>  // Correctly inject the model using the string 'Stage'
  ) {}

  // Method to create a new stage
  async createStage(stageName: string, scheduledTime: string, hostUserId: string): Promise<Stage> {
    console.log('Creating stage...', stageName, scheduledTime, hostUserId);
    const createdStage = new this.stageModel({
      stageName,
      scheduledTime: new Date(scheduledTime),
      hostUserId,
    });
    return createdStage.save();  // Save the stage in MongoDB
  }

  async getUpcomingStages(hostUserId: string, limit: number, offset: number): Promise<{ count: number, results: Stage[] }> {
    const query = { hostUserId, status: 'scheduled' };
    const count = await this.stageModel.countDocuments(query);
    const results = await this.stageModel.find(query)
      .skip(offset)
      .limit(limit)
      .exec();
    return { count, results };
  }

  // Other methods...
}
