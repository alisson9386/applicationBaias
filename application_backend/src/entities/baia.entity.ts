import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'baia' })
export class Baia {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  andar: number;

  @Column({default: true})
  fl_ativo: boolean;
}
