import { Module } from '@nestjs/common';
import { BaiaService } from '../service/baia.service';
import { BaiaController } from '../controller/baia.controller';
import { Baia } from '../entities/baia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Baia])],
  controllers: [BaiaController],
  providers: [BaiaService]
})
export class BaiaModule {}
