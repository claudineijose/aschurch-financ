import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ContasBancariasService } from './contas-bancarias.service';
import { CreateContasBancariaDto } from './dto/create-contas-bancaria.dto';
import { UpdateContasBancariaDto } from './dto/update-contas-bancaria.dto';
import { AuthGuard } from '../auth/auth.guard';
import { REQUEST } from '@nestjs/core';

@UseGuards(AuthGuard)
@Controller('contas-bancarias')
export class ContasBancariasController {
  constructor(
    private readonly contasBancariasService: ContasBancariasService,
    @Inject(REQUEST) private request: Request,
  ) {}

  @Post()
  create(@Body() createContasBancariaDto: CreateContasBancariaDto) {
    return this.contasBancariasService.create({
      ...createContasBancariaDto,
      UsuarioId: this.request['Usuario'].sub,
    });
  }

  @Get()
  findAll() {
    return this.contasBancariasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contasBancariasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContasBancariaDto: UpdateContasBancariaDto,
  ) {
    return this.contasBancariasService.update(+id, {
      ...updateContasBancariaDto,
      UsuarioId: this.request['Usuario'].sub,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contasBancariasService.remove(+id);
  }
}
