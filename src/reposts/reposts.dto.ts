import { Body } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class RepostDTO {
  @ApiProperty({ description: 'Message' })
  message: string;
}

