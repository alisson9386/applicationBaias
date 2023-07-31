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

  async findByIdUser(idUser: number): Promise<any> {
    const today = new Date();
    const result = this.reservaRepository.query(
      `
    SELECT reservas.*, baia.nome, baia.andar
      FROM reservas
      INNER JOIN baia ON baia.id = reservas.id_baia_reserva
      WHERE reservas.id_usuario_reserva = ? AND
            reservas.fl_ativo = ? AND
            reservas.periodo_fim >= ?`,
      [idUser, true, today.toISOString()],
    );
    return result;
  }

  update(id: number, updateReservaDto: UpdateReservaDto) {
    return this.reservaRepository.update(id, updateReservaDto);
  }

  async desactivateReserva(id: number): Promise<boolean> {
    const reserva = await this.reservaRepository.findOneBy({ id: id });
    reserva.fl_ativo = false;
    const save = await this.reservaRepository.update(id, reserva);
    return save ? true : false;
  }
}
