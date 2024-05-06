import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as moment from 'moment';
import { ReturnMessageType } from 'src/graphql/return-message.type';
import { TablingList } from './model/tabling-list.model';
import { TablingCreateListType } from './graphql/create-list.type';
import { TablingListInputType } from './graphql/list-input.type';
import { UniqueConstraintError, WhereOptions } from 'sequelize';
import { TablingShopService } from '../TablingShop/tabling-shop.service';

@Injectable()
export class TablingListService {
    constructor(
        @InjectModel(TablingList)
        private listModel: typeof TablingList,

        private readonly shopService: TablingShopService,
    ) { }

    async getWaitList(condition: TablingListInputType): Promise<TablingList[]> {
        const list = await this.listModel.findAll({
            where: {
                ...condition
            },
        });

        if (list.length === 0) {
            throw new Error('Waiting list is empty'); 
        }

        return list;
    }

    async create(createData: TablingCreateListType): Promise<TablingList> {
        try {
            await this.shopService.findByPk(createData.shop_id); // 찾지 못하면 오류반환

            return await this.listModel.create({
                shop_id: createData.shop_id,
                phone_number: createData.phone_number,
                tabling_type: createData.tabling_type,
                personnel: createData.personnel,
            });
        } catch (error) {
            throw new Error('Failed to create a list');
        }
    }
}