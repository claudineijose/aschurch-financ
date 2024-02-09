import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  MaxLength,
} from 'class-validator';

export enum TipoConta {
  Corrente = 'C',
  Poupanca = 'P',
  Outros = 'O',
}

export class CreateContasBancariaDto {
  @IsInt({
    message: 'Código do Banco deve ser numérico',
  })
  @IsNotEmpty({
    message: 'Código do Banco é de preenchimento obrigatório',
  })
  BancoId: number;

  @IsEnum(TipoConta, {
    message: 'Tipo de Conta Inválida',
  })
  @IsNotEmpty({
    message: 'Tipo de Conta é de preenchimento obrigatório',
  })
  TipoConta: TipoConta;

  @IsDate()
  @Type(() => Date)
  DataAbertura: Date;

  @MaxLength(5, { message: 'Agência inválida' })
  Agencia: string;

  @MaxLength(15, { message: 'Conta inválida' })
  ContaNumero: string;

  Gerente: string;

  @MaxLength(15, { message: 'Telefone inválido' })
  Telefone: string;

  @IsEmail()
  Email: string;

  Observacao: string;

  @IsNumber()
  Limite: number;

  @IsDate()
  @Type(() => Date)
  DataVencimentoLimite: Date;
}
