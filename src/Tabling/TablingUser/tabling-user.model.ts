import {
    PrimaryKey,
    Column,
    Model,
    Table,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
  } from 'sequelize-typescript';
  
  @Table({
    tableName: 'tabling_users',
    underscored: true,
  })
  export class TablingUser extends Model<TablingUser> {
    @PrimaryKey
    @Column({autoIncrement: true})
    id: number;
  
    @Column({
      unique: true,
      allowNull: false,
    })
    user_name: string;
  
    @Column({
      unique: true,
      allowNull: false,
    })
    email: string;
  
    @Column({
      unique: true,
      allowNull: false,
    })
    phone_number: string;
  
    @Column({
      allowNull: false,
    })
    password: string;
  
    @CreatedAt
    created_at: Date;
  
    @UpdatedAt
    updated_at: Date;
  
    @DeletedAt
    deleted_at: Date;
  }