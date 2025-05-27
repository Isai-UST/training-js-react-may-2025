import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IProject } from './interface/project.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProjectService {
  constructor(@InjectModel('Project') private projectModel: Model<IProject>) { }

  async create(createProjectDto: CreateProjectDto) {
    const newStudent = await new this.projectModel(createProjectDto);
    return newStudent.save();
  }

  async findAll(): Promise<IProject[]> {
    const projectData = await this.projectModel.find();
    if (!projectData || projectData.length == 0) {
        throw new NotFoundException('Projects data not found!');
    }
    return studentData;
  }

  async findOne(id: number): Promise<IProject> {
    const existingProject = await this.projectModel.findById(id).exec();
    if (!existingProject) {
        throw new NotFoundException(`Project #${id} not found`);
    }
    return existingProject;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
