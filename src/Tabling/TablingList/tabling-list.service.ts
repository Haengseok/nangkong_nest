import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TablingList } from './model/tabling-list.model';
import { TablingCreateListType } from './graphql/create-list.type';
import { TablingListInputType } from './graphql/list-input.type';
import { TablingShopService } from '../TablingShop/tabling-shop.service';
import { buildWhereClause } from 'src/common/filter-builder';
import { TablingSetStatusType } from './graphql/set-status.type';

@Injectable()
export class TablingListService {
  constructor(
    @InjectModel(TablingList)
    private listModel: typeof TablingList,

    private readonly shopService: TablingShopService,
  ) {}

  async getWaitList(condition: TablingListInputType): Promise<TablingList[]> {
    // 쿼리 빌더 호출
    const whereData = await buildWhereClause(condition.filters);
    delete condition.filters;

    const list = await this.listModel.findAll({
      where: {
        ...condition,
        ...whereData,
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

  async setStatus(data: TablingSetStatusType): Promise<TablingList> {
    try {
      const list = await this.listModel.findByPk(data.id);
      if (!list) {
        throw new Error('Waiting list is not found');
      }

      await list.update({
        tabling_type: data.tabling_type,
      });

      return list;
    } catch (error) {
      throw error;
    }
  }
}
