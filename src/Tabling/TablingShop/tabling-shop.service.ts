import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UniqueConstraintError } from 'sequelize';
import { TablingShop } from './tabling-shop.model';
import { TablingCreateShop } from './graphql/tabling-create-shop.type';

@Injectable()
export class TablingShopService {
    constructor(
        @InjectModel(TablingShop)
        private shopModel: typeof TablingShop,
    ) { }

    async findOne(shopName: string): Promise<TablingShop> {
        const shop = await this.shopModel.findOne({ where: { shop_name: shopName } });
        if (shop) {
            return shop;
        } else {
            throw new HttpException('Not found Shop', HttpStatus.NOT_FOUND);
        }
    }

    async create(createShop: TablingCreateShop): Promise<TablingShop> {
        try {
            return await this.shopModel.create({
                shop_name: createShop.shop_name,
                phone_number: createShop.phone_number,
                address: createShop.address,
                detail_address: createShop.detail_address,
            });
        } catch (error) {
            // 고유 제약 조건 위반 오류 처리
            if (error instanceof UniqueConstraintError) {
                throw new HttpException('Name or Phone already exists.', HttpStatus.CONFLICT);
            } else {
                throw new Error('Unknown error occurred');
            }
        }
    }
}