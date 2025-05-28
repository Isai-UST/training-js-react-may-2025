import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Put, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Res() response, @Body() createProjectDto: CreateProjectDto) {
    try {
      const newProject = await this.projectService.create(createProjectDto);
      return response.status(HttpStatus.CREATED).json({
          message: 'Project has been created successfully',
          newProject,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: 'Error: Project not created!',
          error: 'Bad Request'
      });
    }
  }

  @Get()
  async findAll(@Res() response, @Query() paginationQuery: PaginationQueryDto) {
    try {
      const projectData = await this.projectService.findAll(paginationQuery);
      return response.status(HttpStatus.OK).json({
          message: 'All projects data found successfully',
          projectData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async findOne(@Res() response, @Param('id') id: string) {
    try {
      const existingProject = await this.projectService.findOne(id);
      return response.status(HttpStatus.OK).json({
          message: 'Project found successfully',
          existingProject,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    try {
      const existingProject = await this.projectService.update(id, updateProjectDto);
      return response.status(HttpStatus.OK).json({
          message: 'Project has been successfully updated',
          existingProject,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async remove(@Res() response, @Param('id') id: string) {
    try {
      const deletedProject = await this.projectService.remove(id);
      return response.status(HttpStatus.OK).json({
          message: 'Project deleted successfully',
          deletedProject,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
