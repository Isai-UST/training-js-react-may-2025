import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { Project } from './project/entities/project.entity';

@Module({
  imports: [ProjectModule, MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'projectdb'}),
  MongooseModule.forFeature([{ name: 'Project', schema: Project }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
