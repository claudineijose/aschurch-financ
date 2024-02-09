import { PartialType } from '@nestjs/mapped-types';
import { CreateBancoDto } from './create-banco.dto';
import { IsEnum } from 'class-validator';

export enum SituacaoBanco {
  Ativo = 'A',
  Inativo = 'I',
}

export class UpdateBancoDto extends PartialType(CreateBancoDto) {
  @IsEnum(SituacaoBanco)
  Situacao: SituacaoBanco;
}
