import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { BancosService } from './bancos.service';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('bancos')
export class BancosController {
  constructor(
    private readonly bancosService: BancosService,
    @Inject(REQUEST) private request: Request,
  ) {}

  @Post()
  create(@Body() createBancoDto: CreateBancoDto) {
    return this.bancosService.create({
      ...createBancoDto,
      UsuarioId: this.request['Usuario'].sub,
    });
  }

  @Get()
  findAll() {
    return this.bancosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bancosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBancoDto: UpdateBancoDto) {
    return this.bancosService.update(+id, {
      ...updateBancoDto,
      UsuarioId: this.request['Usuario'].sub,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bancosService.remove(+id);
  }
}
