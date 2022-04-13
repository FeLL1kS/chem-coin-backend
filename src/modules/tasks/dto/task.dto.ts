import { IsNotEmpty } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly price: number;

  readonly createdByUserId: string;

  readonly assignedUserID: string | null;
}
