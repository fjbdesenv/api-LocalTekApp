import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.statusService.findByCodigo(+codigo);
  }

  @Patch(':codigo')
  update(@Param('codigo') codigo: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(+codigo, updateStatusDto);
  }

  @Delete(':codigo')
  remove(@Param('codigo') codigo: string) {
    return this.statusService.remove(+codigo);
  }
}
