import { UserDto } from 'src/modules/users/dto/user.dto';

export class TaskDto {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly isAssigned: boolean;
  readonly performer: UserDto | null;
}
