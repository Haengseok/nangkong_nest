import {
  Table,
  Column,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'oauth_clients',
  underscored: true, // 카멜 케이스 대신 스네이크 케이스를 사용하는 경우
})
export class Client extends Model<Client> {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  secret: string;

  @Column({
    allowNull: false,
    defaultValue: false,
  })
  password_client: boolean;

  @Column({
    allowNull: false,
    defaultValue: false,
  })
  revoked: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
