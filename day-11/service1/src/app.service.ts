import { Injectable } from '@nestjs/common';
import { ProjectDto } from './dtos/ProjectDto';

@Injectable()
export class AppService {
  BASE_URL = "http://localhost:4000/projects";

  getHello(): string {
    return 'Hello Isai!';
  }

  async createProject(createProjectDto: ProjectDto) {
    const res = await fetch(`${this.BASE_URL}`, {
      method: 'POST',
      body: JSON.stringify(createProjectDto),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error creating the project. Please try again.'
        );
      });
      return res;
  }
}
