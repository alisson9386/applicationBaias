import { Module } from '@nestjs/common';
import { ReservasService } from '../service/reservas.service';
import { ReservasController } from '../controller/reservas.controller';
import { Reserva } from '../entities/reserva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva])],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}
