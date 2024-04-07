import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UniqueConstraintError } from 'sequelize';
import { hash } from 'bcrypt';
import { TablingUser } from './tabling-user.model';
import { TablingCreateUser } from './graphql/tabling-create-user.type';

@Injectable()
export class TablingUserService {
    constructor(
        @InjectModel(TablingUser)
        private readonly userModel: typeof TablingUser, // 사용자 모델 주입
    ) { }

    async findOne(username: string): Promise<TablingUser> {
        const user = this.userModel.findOne({ where: { user_name: username } });
        if (user) {
            return user;
        } else {
            throw new HttpException('Not found User!', HttpStatus.NOT_FOUND);
        }
    }

    async create(CreateUser: TablingCreateUser): Promise<TablingUser> {
        try {
            return await this.userModel.create({
                user_name: CreateUser.user_name,
                email: CreateUser.email,
                password: await this.hashPassword(CreateUser.password),
                phone_number: CreateUser.phone_number,
            });
        } catch (error) {
            // 고유 제약 조건 위반 오류 처리
            if (error instanceof UniqueConstraintError) {
                throw new HttpException('Name or email already exists.', HttpStatus.CONFLICT);
            } else {
                throw new Error('Unknown error occurred');
            }
        }
    }

    // TODO: 공통로직으로 빼기
    // 비밀번호 암호화 로직
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await hash(password, saltRounds);
        return hashedPassword;
    }
}