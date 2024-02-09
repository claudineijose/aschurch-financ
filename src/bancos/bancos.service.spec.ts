import { Test, TestingModule } from '@nestjs/testing';
import { BancosService } from './bancos.service';
import { Repository } from 'typeorm';
import { Bancos } from './entities/banco.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};

export const repositoryMockFactory: () => MockType<Repository<Bancos>> =
  jest.fn(() => ({
    findOne: jest.fn((entity) => entity),
    // ...
  }));

describe('BancosService', () => {
  let service: BancosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BancosService,
        {
          provide: getRepositoryToken(Bancos),
          useFactory: repositoryMockFactory,
        },
        AuthGuard,
        JwtService,
        {
          provide: getRepositoryToken(JwtService),
          useClass: JwtService,
        },
      ],
    }).compile();

    service = module.get<BancosService>(BancosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
