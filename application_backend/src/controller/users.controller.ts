import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/user_dto/create-user.dto';
import { UpdateUserDto } from '../dto/user_dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/login_dto/login.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.authLogin(loginDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('user/:user')
  findUser(@Param('user') user: string) {
    return this.usersService.findUser(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.usersService.desactivateUser(+id);
      return { message: result.message };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { message: error.message, statusCode: HttpStatus.NOT_FOUND };
      } else {
        return {
          message: 'Erro ao deletar',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        };
      }
    }
  }
}
