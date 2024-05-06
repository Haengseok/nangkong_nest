import {
    PrimaryKey,
    Column,
    Model,
    Table,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
} from 'sequelize-typescript';
import { ListStatus } from '../graphql/list-status.enum';

@Table({
    tableName: 'tabling_list',
    underscored: true,
})
export class TablingList extends Model<TablingList> {
    @PrimaryKey
    @Column({ autoIncrement: true })
    id: number;

    @Column
    shop_id: number;

    @Column({
        type: 'ENUM',
        values: ['RUN', 'COMPLETE', 'WAITING'], // Enum의 가능한 값 목록
        allowNull: false,
    })
    tabling_type: ListStatus; // Enum 타입으로 지정

    @Column({
        allowNull: false,
    })
    phone_number: string;

    @Column
    personnel: number;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}