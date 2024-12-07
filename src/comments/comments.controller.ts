import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.gaurd';
import { AddCommentDto } from './add-comment.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/stages/:stage_id/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async addComment(@Param('stage_id') stageId: string,@Body() addComment: AddCommentDto, @Request() req) {
    const userId = req.user.userId;
    const comment = await this.commentsService.addComment(stageId, userId, addComment.commentText);
    return {
      comment_id: comment.comment_id,
      user_id: comment.user_id,
      comment_text: comment.comment_text,
      created_at: comment.created_at,
    };
  }

  @Get('expand')
  async getChildComments(
    @Query('parent_comment_id') parentCommentId: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.commentsService.getChildComments(parentCommentId, limit, offset);
  }
}