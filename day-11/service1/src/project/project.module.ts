import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './schema/project.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'projectdb'}),
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
