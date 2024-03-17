import { Column, Model, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'user' }) 
export class User extends Model<User> {
  @Column
  user_name: string;

  @Column
  email: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}