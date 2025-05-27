import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

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
  async findAll(@Res() response) {
    try {
      const projectData = await this.projectService.findAll();
      return response.status(HttpStatus.OK).json({
          message: 'All projects data found successfully',
          projectData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get(':id')
  findOne(@Res() response, @Param('id') id: string) {
    try {
      const existingStudent = await this.projectService.findOne(+id);
      return response.status(HttpStatus.OK).json({
          message: 'Student found successfully',
          existingStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
