import { DataSourceOptions } from 'typeorm';
import { User } from './users/entities/user.entity';

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: '.db/sql',
  synchronize: true, // Obs: use synchronize: true somente em desenvolvimento.
  entities: [__dirname + '/../**/*.entity{.ts,.js}',User],
};
