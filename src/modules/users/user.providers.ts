import { Providers } from 'src/core/constants';
import { User } from './entities/user.entity';

export const userProviders = [
  {
    provide: Providers.USER_REPOSITORY,
    useValue: User,
  },
];
