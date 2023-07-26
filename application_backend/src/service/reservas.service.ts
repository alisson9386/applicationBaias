import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservaDto } from '../dto/reservas_dto/create-reserva.dto';
import { UpdateReservaDto } from '../dto/reservas_dto/update-reserva.dto';
import { Reserva } from '../entities/reserva.entity';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
  ) {}
  create(createReservaDto: CreateReservaDto) {
    return this.reservaRepository.save(createReservaDto);
  }

  findAll() {
    return this.reservaRepository.find();
  }

  findOne(id: number) {
    return this.reservaRepository.findOneBy({ id: id });
  }

  findByIdBaia(idBaia: number) {
    return this.reservaRepository.findBy({ id_baia_reserva: idBaia });
  }

  findByIdUser(idUser: number) {
    const today = new Date();
    return this.reservaRepository
      .createQueryBuilder('reserva')
      .where('reserva.id_usuario_reserva = :idUser', { idUser })
      .andWhere('reserva.fl_ativo = :flAtivo', { flAtivo: true })
      .andWhere('reserva.periodo_fim >= :today', { today: today.toISOString() }) // Usando ISOString para compatibilidade
      .getMany();
  }

  update(id: number, updateReservaDto: UpdateReservaDto) {
    return this.reservaRepository.update(id, updateReservaDto);
  }

  async desactivateReserva(id: number): Promise<boolean> {
    const reserva = await this.reservaRepository.findOneBy({ id: id });
    reserva.fl_ativo = false;
    const save = await this.reservaRepository.save(reserva);
    return save ? true : false;
  }
}
