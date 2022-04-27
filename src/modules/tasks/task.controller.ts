import {
  Request,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getAllTask() {
    return await this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id) {
    return await this.taskService.getTaskById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createTask(@Request() req) {
    return await this.taskService.create({
      createdByUserId: req.user.id,
      ...req.body,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async assignUser(@Request() req, @Param('taskId') taskId: string) {
    return await this.taskService.assignUser(taskId, req.user.id);
  }
}
