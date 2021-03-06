import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Task } from 'src/modules/tasks/task.entity';
import { Role } from 'src/modules/users/entities/role.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { UserRole } from 'src/modules/users/entities/userRole.entity';
import { Environment, Providers } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: Providers.SEQUELIZE,
    useFactory: async () => {
      let config: SequelizeOptions;
      switch (process.env.NODE_ENV) {
        case Environment.DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case Environment.TEST:
          config = databaseConfig.test;
          break;
        case Environment.PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Role, UserRole, Task]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
