import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { AccessTokenGuard } from 'src/common/guards/guard.access_token';

describe('ProjectController', () => {
  let controller: ProjectController;

  const mockAccessTokenGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [ProjectService],
    })
    .overrideGuard(AccessTokenGuard)
    .useValue(mockAccessTokenGuard)
    .compile();

    controller = module.get<ProjectController>(ProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
