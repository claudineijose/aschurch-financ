import { Injectable } from '@nestjs/common';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bancos } from './entities/banco.entity';

@Injectable()
export class BancosService {
  constructor(
    @InjectRepository(Bancos) private bancoRepo: Repository<Bancos>,
  ) {}

  create(createBancoDto: CreateBancoDto & { UsuarioId: number }) {
    const banco = this.bancoRepo.create(createBancoDto);
    return this.bancoRepo.save(banco);
  }

  findAll() {
    return this.bancoRepo.find();
  }

  findOne(id: number) {
    return this.bancoRepo.findOne({
      where: { Id: id },
    });
  }

  update(id: number, updateBancoDto: UpdateBancoDto & { UsuarioId: number }) {
    return this.bancoRepo.update({ Id: id }, updateBancoDto);
  }

  remove(id: number) {
    return this.bancoRepo.delete({ Id: id });
  }
}
