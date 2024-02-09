import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBancoDto {
  @MaxLength(255, {
    message: 'Descrição deve ter no máximo 255 caracteres',
  })
  @IsString({
    message: 'Descrição deve ser caracteres',
  })
  @IsNotEmpty({
    message: 'Descrição é de preenchimento obrigatório',
  })
  Descricao: string;

  @MaxLength(200, {
    message: 'Site deve ter no máximo 200 caracteres',
  })
  Site: string;

  @MaxLength(500, {
    message: 'Observação deve ter no máximo 500 caracteres',
  })
  Observacao: string;
}
