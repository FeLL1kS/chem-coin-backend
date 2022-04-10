import { Controller, Get, Param } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public getAllTasks(): TaskDto[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  public getTaskById(@Param('id') id): TaskDto {
    return this.tasksService.getTaskById(id);
  }
}
