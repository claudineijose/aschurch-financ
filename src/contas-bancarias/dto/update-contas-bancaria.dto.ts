import { PartialType } from '@nestjs/mapped-types';
import { CreateContasBancariaDto } from './create-contas-bancaria.dto';
import { IsEnum } from 'class-validator';

export enum Situacao {
  Ativo = 'A',
  Inativo = 'I',
}

export class UpdateContasBancariaDto extends PartialType(
  CreateContasBancariaDto,
) {
  @IsEnum(Situacao)
  Situacao: Situacao;
}
