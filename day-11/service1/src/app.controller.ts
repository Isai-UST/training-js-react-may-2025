import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ProjectDto } from './dtos/ProjectDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createProject(@Body() createProjectDto: ProjectDto) {
    return this.appService.createProject(createProjectDto);
  }
}
