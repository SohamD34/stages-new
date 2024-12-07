import { Controller, Post, Param, UseGuards, Request } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.gaurd';

@UseGuards(JwtAuthGuard)
@Controller('api/stages/:stage_id/like')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  async likeStage(@Param('stage_id') stageId: string, @Request() req) {
    const userId = req.user.userId;
    return this.likesService.likeStage(stageId, userId);
  }
}