import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { AccessToken } from './access-token.model';

@Table({
    tableName: 'oauth_refresh_tokens',
    underscored: true,
})
export class RefreshToken extends Model<RefreshToken> {
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => AccessToken)
    @Column
    access_token_id: number;

    @BelongsTo(() => AccessToken)
    access_token: AccessToken;

    @Column
    refresh_token: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}