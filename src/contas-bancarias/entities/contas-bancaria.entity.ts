import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Situacao } from './situacao-conta.enum';
import { TipoConta } from './tipo-conta.enum';
import { Bancos } from '../../bancos/entities/banco.entity';

@Entity('ContasBancarias')
export class ContasBancaria {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column('int')
  BancoId: number;

  @Column({ length: 2, type: 'char', nullable: true })
  TipoConta: TipoConta;

  @Column({ nullable: true })
  DataAbertura: Date;

  @Column({ length: 10, type: 'varchar', nullable: true })
  Agencia: string;

  @Column({ length: 15, type: 'varchar', nullable: true })
  ContaNumero: string;

  @Column({ length: 300, type: 'varchar', nullable: true })
  Gerente: string;

  @Column({ length: 15, type: 'varchar', nullable: true })
  Telefone: string;

  @Column({ length: 200, type: 'varchar', nullable: true })
  Email: string;

  @Column({ length: 500, type: 'varchar', nullable: true })
  Observacao: string;

  @Column({ type: 'float', nullable: true })
  Limite: number;

  @Column({ nullable: true })
  DataVencimentoLimite: Date;

  @Column({ length: 1, type: 'char' })
  Situacao: Situacao = Situacao.Ativo;

  @CreateDateColumn()
  Created_at: Date;

  @UpdateDateColumn()
  Update_at: Date;

  @Column()
  UsuarioId: number;

  @ManyToOne(() => Bancos, { eager: true })
  @JoinColumn({ name: 'BancoId' })
  Banco: Bancos;
}
