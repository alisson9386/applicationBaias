import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SetoresService } from '../service/setores.service';
import { CreateSetoreDto } from '../dto/setores_dto/create-setore.dto';
import { UpdateSetoreDto } from '../dto/setores_dto/update-setore.dto';

@Controller('setores')
export class SetoresController {
  constructor(private readonly setoresService: SetoresService) {}

  @Post()
  create(@Body() createSetoreDto: CreateSetoreDto) {
    return this.setoresService.create(createSetoreDto);
  }

  @Get()
  findAll() {
    return this.setoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetoreDto: UpdateSetoreDto) {
    return this.setoresService.update(+id, updateSetoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const desactivate = this.setoresService.desactivateSetor(+id);
    return desactivate ? 'Setor deletado' : 'Erro ao deletar';
  }
}
