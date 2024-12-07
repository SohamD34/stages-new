import { Body } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDeviceDto {
  @ApiProperty({ description: 'Device token' })
  deviceToken: string;
}

