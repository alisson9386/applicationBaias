import { DataSourceOptions } from 'typeorm';
import { User } from './entities/user.entity';

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: '.db/sql',
  synchronize: true, // Obs: use synchronize: true somente em desenvolvimento.
  entities: [User],
};
