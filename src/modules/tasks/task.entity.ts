import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/entities/user.entity';

@Table
export class Task extends Model<Task> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.DECIMAL(2),
    allowNull: false,
  })
  price: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  createdByUserId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  assignedUserId: string;

  @BelongsTo(() => User, 'createdByUserId')
  createdByUser: User;

  @BelongsTo(() => User, 'assignedUserId')
  assignedUser: User;
}
