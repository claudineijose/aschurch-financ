import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Usuarios')
export class Auth {
  @PrimaryColumn()
  Id: number;

  @Column()
  Nome: string;

  @Column()
  Username: string;

  @Column()
  Senha: string;

  @Column()
  CongregacaoId: number;

  @Column()
  Status: number;
}
