import { Body } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class AddCommentDto {
@ApiProperty({ description: 'Comment...' })
  commentText: string;
}

