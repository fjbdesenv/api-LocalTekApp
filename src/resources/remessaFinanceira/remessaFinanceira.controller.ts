import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RemessaFinanceiraService } from './remessaFinanceira.service';
import { CreateRemessaFinanceiraDto } from './dto/create-remessaFinanceira.dto';
import { UpdateRemessaFinanceiraDto } from './dto/update-remessaFinanceira.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RemessaFinanceira } from './entities/remessaFinanceira.entity';

@ApiBearerAuth()
@ApiTags('Remessa Financeira')
@Controller('remessas-financeiras')
export class RemessaFinanceiraController {
  constructor(private readonly remessaFinanceiraService: RemessaFinanceiraService) { }

  @Post()
  @ApiOperation({ summary: 'Cadastrar uma nova Remessa Financeira' })
  @ApiResponse({ status: 201, description: 'Created', type: RemessaFinanceira })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createRemessaFinanceiraDto: CreateRemessaFinanceiraDto) {
    return this.remessaFinanceiraService.create(createRemessaFinanceiraDto);
  }

  @Get()
  @ApiOperation({ summary: 'Consultar todas as Remessa Financeira' })
  @ApiResponse({ status: 200, description: 'OK', type: [RemessaFinanceira] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.remessaFinanceiraService.findAll();
  }

  @Get(':codigo')
  @ApiOperation({ summary: 'Consultar uma Remessa Financeira' })
  @ApiResponse({ status: 200, description: 'OK', type: RemessaFinanceira })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorize' })
  findOne(@Param('codigo') codigo: number) {
    return this.remessaFinanceiraService.findByCodigo(codigo);
  }

  @Patch(':codigo')
  @ApiOperation({ summary: 'Editar uma Remessa Financeira' })
  @ApiResponse({ status: 200, description: 'OK', type: RemessaFinanceira })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(
    @Param('codigo') codigo: number,
    @Body() updateRemessaFinanceiraDto: UpdateRemessaFinanceiraDto,
  ) {
    return this.remessaFinanceiraService.update(codigo, updateRemessaFinanceiraDto);
  }

  @Delete(':codigo')
  @ApiOperation({ summary: 'Deletar uma Remessa Financeira' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('codigo') codigo: number) {
    return this.remessaFinanceiraService.remove(codigo);
  }
}
