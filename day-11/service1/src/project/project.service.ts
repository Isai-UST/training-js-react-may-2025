import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { IProject } from './interface/project.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProjectService {
  constructor(@InjectModel('Project') private projectModel: Model<IProject>) { }

  async create(createProjectDto: CreateProjectDto): Promise<IProject> {
    const newProject = await new this.projectModel(createProjectDto);
    return newProject.save();
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<IProject[]> {
    const { page = 1, limit = 10 } = paginationQuery;

    const projectData = await (this.projectModel as any).paginate({}, {
      page,
      limit,
    });
    if (!projectData || projectData.length == 0) {
        throw new NotFoundException('Projects data not found!');
    }
    return projectData;
  }

  async findOne(id: string): Promise<IProject> {
    const existingProject = await this.projectModel.findById(id).exec();
    if (!existingProject) {
        throw new NotFoundException(`Project #${id} not found`);
    }
    return existingProject;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<IProject> {
    const existingProject = await this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true });
    if (!existingProject) {
        throw new NotFoundException(`Project #${id} not found`);
    }
    return existingProject;
  }

  async remove(id: string): Promise<IProject> {
    const deletedProject = await this.projectModel.findByIdAndDelete(id);
    if (!deletedProject) {
        throw new NotFoundException(`Project #${id} not found`);
    }
    return deletedProject;
  }
}
