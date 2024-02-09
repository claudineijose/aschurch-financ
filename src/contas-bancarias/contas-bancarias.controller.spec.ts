import { Test, TestingModule } from '@nestjs/testing';
import { ContasBancariasController } from './contas-bancarias.controller';
import { ContasBancariasService } from './contas-bancarias.service';
import { ContasBancaria } from './entities/contas-bancaria.entity';
import { Repository } from 'typeorm';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};

export const repositoryMockFactory: () => MockType<Repository<ContasBancaria>> =
  jest.fn(() => ({
    findOne: jest.fn((entity) => entity),
    // ...
  }));

describe('ContasBancariasController', () => {
  let controller: ContasBancariasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContasBancariasController, AuthGuard, JwtService],
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
    })
      .overrideProvider(REQUEST)
      .useValue(null)
      .compile();

    controller = module.get<ContasBancariasController>(
      ContasBancariasController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
