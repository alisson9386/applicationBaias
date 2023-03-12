import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'setores'})
export class Setores {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome_setor: string;

  @Column()
  id_gerente: number;
}
