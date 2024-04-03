import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, HasOne } from 'sequelize-typescript';
import { RefreshToken } from './refresh-token.model';

@Table({
    tableName: 'oauth_access_tokens',
    underscored: true,
})
export class AccessToken extends Model<AccessToken> {
    @PrimaryKey
    @Column({ autoIncrement: true })
    id: number;

    @Column
    user_id: number;

    @Column
    client_id: number;

    @Column
    secret: string;

    @Column
    scopes: string;

    @Column({
        allowNull: false,
        defaultValue: false,
    })
    revoked: boolean;

    @HasOne(() => RefreshToken)
    refresh_token: RefreshToken;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;
}