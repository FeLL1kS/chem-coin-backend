import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { TaskModule } from './modules/tasks/task.module';
import { UsersModule } from './modules/users/user.module';

@Module({
  imports: [
    AuthorizationModule,
    TaskModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
  ],
})
export class AppModule {}
