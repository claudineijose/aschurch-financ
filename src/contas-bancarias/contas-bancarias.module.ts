import { Module } from '@nestjs/common';
import { ContasBancariasService } from './contas-bancarias.service';
import { ContasBancariasController } from './contas-bancarias.controller';
import { ContasBancaria } from './entities/contas-bancaria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ContasBancaria])],
  controllers: [ContasBancariasController],
  providers: [ContasBancariasService],
})
export class ContasBancariasModule {}
