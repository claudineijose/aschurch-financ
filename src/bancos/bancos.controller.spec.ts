import { Test, TestingModule } from '@nestjs/testing';
import { BancosController } from './bancos.controller';
import { BancosService } from './bancos.service';
import { Bancos } from './entities/banco.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';
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

describe('BancosController', () => {
  let controller: BancosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BancosController, AuthGuard, JwtService],
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
    })
      .overrideProvider(REQUEST)
      .useValue(null)
      .compile();

    controller = module.get<BancosController>(BancosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
