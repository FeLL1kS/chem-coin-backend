import { Module } from '@nestjs/common';
import { userProviders } from './user.providers';
import { UsersService } from './user.service';

@Module({
  providers: [UsersService, ...userProviders],
  exports: [UsersService],
})
export class UsersModule {}
