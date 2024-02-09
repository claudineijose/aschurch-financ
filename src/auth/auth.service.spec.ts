import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};

export const repositoryMockFactory: () => MockType<Repository<Auth>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
  }),
);

describe('AuthService', () => {
  let service: AuthService;
  //let repositoryMock: MockType<Repository<Auth>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        AuthGuard,
        JwtService,
        {
          provide: getRepositoryToken(Auth),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(JwtService),
          useClass: JwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    //repositoryMock = module.get(getRepositoryToken(Auth));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
