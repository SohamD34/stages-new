import { Controller, Post, Body } from '@nestjs/common';
import { StagesService } from './stages.service';

@Controller('stages')
export class StagesController {
    constructor(private readonly stagesService: StagesService) {}

    @Post('schedule')
    scheduleStage(@Body() body: { stage_name: string; time: string }) {
        return this.stagesService.scheduleStage(body);
    }
}
