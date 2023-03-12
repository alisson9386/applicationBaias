import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user_dto/create-user.dto';
import { UpdateUserDto } from '../dto/user_dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }
  
  findOne(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async desactivateUser(id: number): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ id: id });
    user.fl_ativo = false;
    const save = await this.userRepository.save(user);
    return save ? true : false;
  }
}
