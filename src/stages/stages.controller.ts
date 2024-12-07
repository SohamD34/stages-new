import { Controller, Post, Body, UseGuards, Request, Get, Query } from '@nestjs/common';
import { StagesService } from './stages.service';
import { CreateStageDto } from './dto/create-stage.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gaurd';


@UseGuards(JwtAuthGuard)  // This will protect the route with JWT authentication
@ApiTags('stages') // This groups the routes under the 'auth' tag in Swagger UI
@Controller('api/stages')
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Post('schedule')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 400, description: 'User already exists' })
  async createStage(@Body() createStageDto: CreateStageDto, @Request() req) {
    console.log(req.user);
    const userId = req.user.username;
    const stage = await this.stagesService.createStage(createStageDto.stage_name, createStageDto.time,userId);
    return stage;
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get upcoming stages' })
  @ApiResponse({ status: 200, description: 'Upcoming stages retrieved successfully' })
  async getUpcomingStages(
    @Query('host_user_id') hostUserId: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    const stages = await this.stagesService.getUpcomingStages(hostUserId, limit, offset);
    return stages;
  }
}
