import { Body } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class sendNotif {
  @ApiProperty({ description: 'Stage ID' })
  stageId: string;

  @ApiProperty({ description: 'Event type' })
  eventType: string;

  @ApiProperty({ description: 'Message' })
  message: string;
}

