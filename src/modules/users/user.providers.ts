import { Providers } from 'src/core/constants';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';

export const userProviders = [
  {
    provide: Providers.USER_REPOSITORY,
    useValue: User,
  },
  {
    provide: Providers.ROLES_REPOSITORY,
    useValue: Role,
  },
];
