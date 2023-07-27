import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user_dto/create-user.dto';
import { UpdateUserDto } from '../dto/user_dto/update-user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    createUserDto.senha = await bcrypt.hash(createUserDto.senha, 10);
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  findUser(user: string) {
    return this.userRepository.findOneBy({ usuario: user });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.senha = await bcrypt.hash(updateUserDto.senha, 10);
    return this.userRepository.update(id, updateUserDto);
  }

  async desactivateUser(id: number): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ id: id });
    user.fl_ativo = false;
    const save = await this.userRepository.save(user);
    return save ? true : false;
  }

  async validateUser(usuario: string, senha: string) {
    const user = await this.userRepository.findOneBy({ usuario: usuario });

    if (user && (await bcrypt.compare(senha, user.senha))) {
      const { senha, ...result } = user;
      return result;
    }

    return null;
  }
}
