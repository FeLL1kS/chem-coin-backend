import { Providers } from 'src/core/constants';
import { User } from './user.entity';

export const usersProviders = [
  {
    provide: Providers.USER_REPOSITORY,
    useValue: User,
  },
];
