import { Injectable } from '@nestjs/common';

@Injectable()
export class StagesService {
    private stages = [];

    scheduleStage(stage: { stage_name: string; time: string }) {
        const newStage = {
            ...stage,
            stage_id: Math.random().toString(36).substr(2, 9),
            host_user_id: 'mock_user_id',
            status: 'scheduled',
        };
        this.stages.push(newStage);
        return newStage;
    }
}
