import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    signIn: jest.fn((dto: AuthDto) => {
      if (dto.email === 'test' && dto.password === 'password') {
        return { access_token: 'mocked_token' };
      } else {
        throw new Error('Invalid credentials');
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
          provide: AuthService,
          useValue: mockAuthService,
        }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a token for valid credentials', async () => {
    const dto: AuthDto = { email: 'test', password: 'password' };

    const result = await controller.signin(dto);
    expect(result).toEqual({ access_token: 'mocked_token' });
  })
});
