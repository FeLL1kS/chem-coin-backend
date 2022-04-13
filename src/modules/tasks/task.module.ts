import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { taskProviders } from './task.providers';

@Module({
  providers: [TaskService, ...taskProviders],
  controllers: [TaskController],
})
export class TaskModule {}
