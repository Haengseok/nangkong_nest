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
    tableName: 'tabling_shop',
    underscored: true,
})
export class TablingShop extends Model<TablingShop> {
    @PrimaryKey
    @Column({ autoIncrement: true })
    id: number;

    @Column({
        unique: true,
        allowNull: false,
    })
    shop_name: string;

    @Column({
        allowNull: false,
    })
    address: string;

    @Column({
        allowNull: false,
    })
    detail_address: string;

    @Column
    phone_number: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}