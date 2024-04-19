import {
    PrimaryKey,
    Column,
    Model,
    Table,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';
import { TablingShop } from './tabling-shop.model';

@Table({
    tableName: 'tabling_shop_open_close',
    underscored: true,
    timestamps: false,
})
export class TablingShopOpenClose extends Model<TablingShopOpenClose> {
    @PrimaryKey
    @Column({ autoIncrement: true })
    id: number;

    @ForeignKey(() => TablingShop)
    @Column({
        allowNull: false,
    })
    shop_id: number;

    @BelongsTo(() => TablingShop)
    shop: TablingShop;

    @Column
    open_time: Date;

    @Column
    close_time: Date;
}