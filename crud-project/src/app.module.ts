import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    UsersModule, 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Z0rr0b@tmak',
      database: 'application_baias',
      entities: [User, Baia, Reserva, Setores, TipoUser],
      synchronize: true,
    }), UsersModule, BaiaModule, ReservasModule, SetoresModule, TipoUsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
