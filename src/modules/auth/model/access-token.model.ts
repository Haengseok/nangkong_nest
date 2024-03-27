import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
    tableName: 'oauth_access_tokens',
    underscored: true,
})
export class AccessToken extends Model<AccessToken> {
    @PrimaryKey
    @Column
    id: number;

    @Column
    user_id: number;

    @Column
    client_id: number;

    @Column
    access_token: string;

    @Column
    scopes: string;

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