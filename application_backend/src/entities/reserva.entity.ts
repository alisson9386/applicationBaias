import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'reservas'})
export class Reserva {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  periodo_inicio: Date;

  @Column()
  periodo_fim: Date;

  @Column()
  id_usuario_reserva: number;

  @Column()
  id_baia_reserva: number;

  @Column({default: true})
  fl_ativo: boolean;
}
