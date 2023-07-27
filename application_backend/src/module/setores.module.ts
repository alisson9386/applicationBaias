import { Module } from '@nestjs/common';
import { SetoresService } from '../service/setores.service';
import { SetoresController } from '../controller/setores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setores } from '../entities/setores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Setores])],
  controllers: [SetoresController],
  providers: [SetoresService],
})
export class SetoresModule {}
