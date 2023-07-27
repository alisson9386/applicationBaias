import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservaBaiasByDateDto } from 'src/dto/baia_dto/reservas-baia.dto';
import { Repository } from 'typeorm';
import { CreateBaiaDto } from '../dto/baia_dto/create-baia.dto';
import { UpdateBaiaDto } from '../dto/baia_dto/update-baia.dto';
import { Baia } from '../entities/baia.entity';

@Injectable()
export class BaiaService {
  constructor(
    @InjectRepository(Baia)
    private baiaRepository: Repository<Baia>,
  ) {}
  create(createBaiaDto: CreateBaiaDto) {
    return this.baiaRepository.save(createBaiaDto);
  }

  findAll() {
    return this.baiaRepository.find();
  }

  async findBaiaByDate(
    reservaBaiasByDateDto: ReservaBaiasByDateDto,
  ): Promise<Baia[]> {
    const query = this.baiaRepository
      .createQueryBuilder('baia')
      .leftJoin('reservas', 'reservas', 'reservas.id_baia_reserva = baia.id')
      .where(
        'reservas.periodo_inicio NOT BETWEEN :periodo_inicio AND :periodo_fim',
      )
      .orWhere(
        'reservas.periodo_fim NOT BETWEEN :periodo_inicio AND :periodo_fim',
      )
      .setParameter('periodo_inicio', reservaBaiasByDateDto.periodo_inicio)
      .setParameter('periodo_fim', reservaBaiasByDateDto.periodo_fim);

    return await query.getMany();
  }

  findOne(id: number) {
    return this.baiaRepository.findOneBy({ id: id });
  }

  update(id: number, updateBaiaDto: UpdateBaiaDto) {
    return this.baiaRepository.update(id, updateBaiaDto);
  }

  async desactivateBaia(id: number): Promise<boolean> {
    const baia = await this.baiaRepository.findOneBy({ id: id });
    baia.fl_ativo = false;
    const save = await this.baiaRepository.save(baia);
    return save ? true : false;
  }
}
