import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { AccessToken } from './access-token.model';

@Table({
    tableName: 'oauth_refresh_tokens',
    underscored: true,
})
export class RefreshToken extends Model<RefreshToken> {
    @PrimaryKey
    @Column({autoIncrement: true})
    id: number;

    @ForeignKey(() => AccessToken)
    @Column
    access_token_id: number;

    @BelongsTo(() => AccessToken)
    access_token: AccessToken;

    @Column
    refresh_token: string;

    @Column({
        allowNull: false,
        defaultValue: false,
    })
    revoked: boolean;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}