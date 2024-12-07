import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comment.schema';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async addComment(stageId: string, userId: string, commentText: string): Promise<Comment> {
    const newComment = new this.commentModel({
      stage_id: stageId,
      user_id: userId,
      comment_text: commentText,
    });
    return newComment.save();
  }

  async getChildComments(parentCommentId: string, limit: number, offset: number): Promise<{ total_comments: number, comments: Comment[], next_offset: number | null, previous_offset: number | null }> {
    const query = { parent_comment_id: parentCommentId };
    const totalComments = await this.commentModel.countDocuments(query);
    const comments = await this.commentModel.find(query)
      .skip(offset)
      .limit(limit)
      .exec();

    const nextOffset = offset + limit < totalComments ? offset + limit : null;
    const previousOffset = offset > 0 ? offset - limit : null;

    return {
      total_comments: totalComments,
      comments,
      next_offset: nextOffset,
      previous_offset: previousOffset,
    };
  }
}