import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BaiaService } from '../service/baia.service';
import { CreateBaiaDto } from '../dto/baia_dto/create-baia.dto';
import { UpdateBaiaDto } from '../dto/baia_dto/update-baia.dto';

@Controller('baia')
export class BaiaController {
  constructor(private readonly baiaService: BaiaService) {}

  @Post()
  create(@Body() createBaiaDto: CreateBaiaDto) {
    return this.baiaService.create(createBaiaDto);
  }

  @Get()
  findAll() {
    return this.baiaService.findAll();
  }

  @Get()
  findDisponiveisByDate(){
    
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baiaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaiaDto: UpdateBaiaDto) {
    return this.baiaService.update(+id, updateBaiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const desactivate = this.baiaService.desactivateBaia(+id);
    return desactivate ? "Baia deletada" : "Erro ao deletar";
  }
}
