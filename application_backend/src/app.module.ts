import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { LoggerService } from './service/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: 'zaq12wsxZAQ!@WSXZ0rr0b@tmak',
      signOptions: { expiresIn: '30m' },
    }),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [User, Baia, Reserva, Setores, TipoUser],
      synchronize: false,
    }),
    UsersModule,
    BaiaModule,
    ReservasModule,
    SetoresModule,
    TipoUsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtMiddleware,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    LoggerService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'users/login', method: RequestMethod.POST },
        { path: 'users/user/:user', method: RequestMethod.GET },
        { path: 'users/:id', method: RequestMethod.PATCH },
      )
      .forRoutes('*');
  }
}
