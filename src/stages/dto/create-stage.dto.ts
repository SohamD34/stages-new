import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsISO8601 } from 'class-validator';

export class CreateStageDto {
  @ApiProperty({ description: 'The name of the stage' })
  @IsString()
  stage_name: string;

  @ApiProperty({ description: 'The scheduled time for the stage' })
  @IsISO8601()
  time: string; // ISO 8601 formatted date string (e.g., 2024-12-10T14:30:00Z)
}
