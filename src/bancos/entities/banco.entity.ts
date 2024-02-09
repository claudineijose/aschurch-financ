import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SituacaoBanco } from './situacaobanco.enum';
import { ContasBancaria } from '../../contas-bancarias/entities/contas-bancaria.entity';

@Entity('Bancos')
export class Bancos {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 255, type: 'varchar' })
  Descricao: string;

  @Column({ length: 200, type: 'varchar' })
  Site: string;

  @Column({ length: 500, type: 'varchar' })
  Observacao: string;

  @Column({ length: 1, type: 'char' })
  Situacao: SituacaoBanco = SituacaoBanco.Ativo;

  @CreateDateColumn()
  Created_at: Date;

  @UpdateDateColumn()
  Update_at: Date;

  @Column()
  UsuarioId: number;

  @OneToMany(() => ContasBancaria, (item) => item.Banco)
  ContasBancarias: ContasBancaria[];
}
