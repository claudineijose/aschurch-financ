import { Injectable } from '@nestjs/common';
import { CreateContasBancariaDto } from './dto/create-contas-bancaria.dto';
import { UpdateContasBancariaDto } from './dto/update-contas-bancaria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContasBancaria } from './entities/contas-bancaria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContasBancariasService {
  constructor(
    @InjectRepository(ContasBancaria) private repo: Repository<ContasBancaria>,
  ) {}

  create(
    createContasBancariaDto: CreateContasBancariaDto & { UsuarioId: number },
  ) {
    const conta = this.repo.create(createContasBancariaDto);
    return this.repo.save(conta);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { Id: id } });
  }

  update(
    id: number,
    updateContasBancariaDto: UpdateContasBancariaDto & { UsuarioId: number },
  ) {
    return this.repo.update({ Id: id }, updateContasBancariaDto);
  }

  remove(id: number) {
    return this.repo.delete({ Id: id });
  }
}
