import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users.module';
import { User } from './entities/user.entity';
import { BaiaModule } from './module/baia.module';
import { ReservasModule } from './module/reservas.module';
import { SetoresModule } from './module/setores.module';
import { TipoUsersModule } from './module/tipo-users.module';
import { Baia } from './entities/baia.entity';
import { Reserva } from './entities/reserva.entity';
import { Setores } from './entities/setores.entity';
import { TipoUser } from './entities/tipo-user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from './auth/jwt.middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: 'zaq12wsxZAQ!@WSXZ0rr0b@tmak',
      signOptions: { expiresIn: '30m' },
    }),
    UsersModule, 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Z0rr0b@tmak',
      database: 'application_baias',
      entities: [User, Baia, Reserva, Setores, TipoUser],
      synchronize: false,
    }), UsersModule, BaiaModule, ReservasModule, SetoresModule, TipoUsersModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(JwtMiddleware)
    .exclude(
      {path: 'users/login', method: RequestMethod.POST},
      {path: 'users/user/:user', method: RequestMethod.GET},
      {path: 'users/:id', method: RequestMethod.PATCH}
    ).forRoutes('*');
  }
}
