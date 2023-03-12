import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSetoreDto } from '../dto/setores_dto/create-setore.dto';
import { UpdateSetoreDto } from '../dto/setores_dto/update-setore.dto';
import { Setores } from '../entities/setores.entity';

@Injectable()
export class SetoresService {
  constructor(
    @InjectRepository(Setores)
    private setoresRepository: Repository<Setores>,
  ) {}
  create(createSetoreDto: CreateSetoreDto) {
    return this.setoresRepository.save(createSetoreDto);
  }

  findAll() {
    return this.setoresRepository.find();
  }

  findOne(id: number) {
    return this.setoresRepository.findOneBy({id : id});
  }

  update(id: number, updateSetoreDto: UpdateSetoreDto) {
    return this.setoresRepository.update(id, updateSetoreDto);
  }

  remove(id: number) {
    return this.setoresRepository.delete(id);
  }
}
