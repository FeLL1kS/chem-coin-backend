import { Injectable, Inject } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Providers } from 'src/core/constants';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(Providers.USER_REPOSITORY)
    private userRepository: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }
}
