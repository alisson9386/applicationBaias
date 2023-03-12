import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuario' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;
  
  @Column()
  usuario: string;

  @Column()
  senha: string;

  @Column()
  email: string;

  @Column()
  idade: number;

  @Column()
  tipo_user: number;

  @Column()
  setor_user: number;
}
