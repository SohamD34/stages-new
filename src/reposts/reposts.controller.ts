import { Controller, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { RepostsService } from './reposts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.gaurd';
import { RepostDTO } from './reposts.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/stages/:stage_id/repost')
export class RepostsController {
  constructor(private readonly repostsService: RepostsService) {}

  @Post()
  async repostStage(@Param('stage_id') stageId: string, @Body() repost: RepostDTO, @Request() req) {
    const userId = req.user.userId;
    return this.repostsService.repostStage(stageId, userId, repost.message);
  }
}