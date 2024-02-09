import { Test, TestingModule } from '@nestjs/testing';
import { ContasBancariasService } from './contas-bancarias.service';
import { ContasBancaria } from './entities/contas-bancaria.entity';
import { Repository } from 'typeorm';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};

export const repositoryMockFactory: () => MockType<Repository<ContasBancaria>> =
  jest.fn(() => ({
    findOne: jest.fn((entity) => entity),
    // ...
  }));

describe('ContasBancariasService', () => {
  let service: ContasBancariasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContasBancariasService,
        {
          provide: getRepositoryToken(ContasBancaria),
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

    service = module.get<ContasBancariasService>(ContasBancariasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
