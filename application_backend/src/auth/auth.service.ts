import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/service/users.service";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}
  
  async authLogin(loginDto){
    const authenticatedUser = await this.usersService.validateUser(loginDto.usuario, loginDto.senha);
    if (!authenticatedUser) {
        throw new HttpException('Usuário ou senha inválidos', HttpStatus.UNAUTHORIZED);
    }
    const payload = { user: authenticatedUser };
    const secretKey = {secret: 'zaq12wsxZAQ!@WSXZ0rr0b@tmak', expiresIn: '30m'};
    return {
      token: this.jwtService.sign(payload, secretKey),
    };
  }

}