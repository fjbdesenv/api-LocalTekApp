import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusService } from './status.service';
import { Status } from './entities/status.entity';

@ApiBearerAuth()
@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) { }

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo status' })
  @ApiResponse({ status: 201, description: 'Created', type: Status })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @Get()
  @ApiOperation({ summary: 'Consultar todos os status' })
  @ApiResponse({ status: 200, description: 'OK', type: [Status] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.statusService.findAll();
  }

  @Get('/tipo/:tipo')
  @ApiOperation({ summary: 'Consultar todos os status de um tipo' })
  @ApiResponse({ status: 200, description: 'OK', type: [Status] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAllTipo(@Param('tipo') tipo: number) {
    return this.statusService.findAllTipo(tipo);
  }

  @Get(':codigo')
  @ApiOperation({ summary: 'Consultar um status' })
  @ApiResponse({ status: 200, description: 'OK', type: Status })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorize' })
  findOne(@Param('codigo') codigo: number) {
    return this.statusService.findByCodigo(codigo);
  }

  @Patch(':codigo')
  @ApiOperation({ summary: 'Editar um status' })
  @ApiResponse({ status: 200, description: 'OK', type: Status })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(
    @Param('codigo') codigo: number,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.statusService.update(codigo, updateStatusDto);
  }

  @Delete(':codigo')
  @ApiOperation({ summary: 'Deletar um status' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('codigo') codigo: number) {
    return this.statusService.remove(codigo);
  }
}
