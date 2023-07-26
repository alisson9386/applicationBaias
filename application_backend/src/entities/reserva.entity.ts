import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Baia } from './baia.entity';

@Entity({ name: 'reservas' })
export class Reserva {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  periodo_inicio: Date;

  @Column()
  periodo_fim: Date;

  @Column()
  id_usuario_reserva: number;

  @ManyToMany(() => Baia, (baia) => baia.id)
  @Column()
  id_baia_reserva: number;

  @Column({ default: true })
  fl_ativo: boolean;
}
