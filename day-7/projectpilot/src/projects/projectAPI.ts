import authHeader from '../auth/services/auth-header';
import { authService } from '../auth/services/auth.service';
import { Project } from './Project';
const baseUrl = 'http://localhost:3000';
const url = `${baseUrl}/project`;

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return 'Please login again.';
    case 403:
      return 'You do not have permission to view the project(s).';
    default:
      return 'There was an error retrieving the project(s). Please try again.';
  }
}

async function checkStatus(response: any) {
  if (response.ok) {
    return response;
  } else {
    if (response.status == 401){
      await authService.refreshToken();
    }
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response: Response) {
  return response.json();
}

//Only for delay the request and let us see the loading
function delay(ms: number) {
  return function (x: any): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

function convertToProjectModels(data: any): Project[] {
  let projects: Project[] = data.projectData.docs.map(convertToProjectModelDefault);
  return projects;
}

function convertToProjectModelDefault(item: any): Project {
  return new Project(item);
}

function convertToProjectModel(item: any): Project {
  return new Project(item.existingProject);
}

const projectAPI = {
  get(page = 1, name = '') {
    return fetch(`${url}?page=${page}&limit=10&name=${name}`,{
      method: 'GET',
      headers: {
        ...authHeader()
      }
    })
      .then(delay(600))
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToProjectModels)
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error retrieving the projects. Please try again.'
        );
      });
  },
  put(project: Project) {
    return fetch(`${url}/${project._id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      }
    })
      .then(delay(600))
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error updating the project. Please try again.'
        );
      });
  },
  post(project: Project) {
    return fetch(`${url}`, {
      method: 'POST',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      }
    })
      .then(delay(600))
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error creating the project. Please try again.'
        );
      });
  },
  find(id: any) {
    return fetch(`${url}/${id}`,{
      method: 'GET',
      headers: {
        ...authHeader()
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToProjectModel)
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error retrieving the project. Please try again.'
        );
      });
  },
  delete(id: string) {
    return fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      }
    })
      .then(delay(600))
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error deleting the project. Please try again.'
        );
      });
  },
};

export { projectAPI };