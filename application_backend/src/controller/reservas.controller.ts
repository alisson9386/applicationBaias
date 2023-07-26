import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservasService } from '../service/reservas.service';
import { CreateReservaDto } from '../dto/reservas_dto/create-reserva.dto';
import { UpdateReservaDto } from '../dto/reservas_dto/update-reserva.dto';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservasService.create(createReservaDto);
  }

  @Get()
  findAll() {
    return this.reservasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservasService.findOne(+id);
  }

  @Get('porBaia/:idBaia')
  findReservByIdBaia(@Param('idBaia') idBaia: number) {
    return this.reservasService.findByIdBaia(idBaia);
  }

  @Get('porUser/:idUser')
  findReservByIdUser(@Param('idUser') idUser: number) {
    return this.reservasService.findByIdUser(idUser);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservasService.update(+id, updateReservaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const desactivate = this.reservasService.desactivateReserva(+id);
    return desactivate ? 'Reserva deletada' : 'Erro ao deletar';
  }
}
