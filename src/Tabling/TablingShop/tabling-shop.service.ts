import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UniqueConstraintError } from 'sequelize';
import { TablingShop } from './model/tabling-shop.model';
import { TablingCreateShop } from './graphql/tabling-create-shop.type';
import { TablingShopOpenClose } from './model/tabling-shop-open-close.module';
import { TablingShopOpenOrCloseType } from './graphql/tabling-shop-open-or-close.type';
import * as moment from 'moment';
import { ReturnMessageType } from 'src/graphql/return-message.type';

@Injectable()
export class TablingShopService {
  constructor(
    @InjectModel(TablingShop)
    private shopModel: typeof TablingShop,

    @InjectModel(TablingShopOpenClose)
    private shopOpenCloseModel: typeof TablingShopOpenClose,
  ) {}

  async findOne(shopName: string): Promise<TablingShop> {
    const shop = await this.shopModel.findOne({
      where: { shop_name: shopName },
      include: [
        {
          model: TablingShopOpenClose,
          where: { close_time: null }, // 마감되지 않은 데이터만 주기
          required: false, // 상위 모델은 필수로 return
        },
      ],
    });
    if (shop) {
      return shop;
    } else {
      throw new HttpException('Not found Shop', HttpStatus.NOT_FOUND);
    }
  }

  async findByPk(id: number) {
    const shop = await this.shopModel.findByPk(id);
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
        throw new HttpException(
          'Name or Phone already exists.',
          HttpStatus.CONFLICT,
        );
      } else {
        throw new Error('Unknown error occurred');
      }
    }
  }

  // 오픈|마감
  async openOrClose(
    data: TablingShopOpenOrCloseType,
  ): Promise<ReturnMessageType> {
    const shop = await this.findByPk(data.shop_id);

    // 오픈일 때
    if (data.status === 'OPEN') {
      if (await this.getOpenClose(shop.id)) {
        // 마감을 하지 않은 매장일 때
        throw new Error('The store is already open');
      }

      this.shopOpenCloseModel.create({
        open_time: moment().toDate(),
        shop_id: shop.id,
      });
    } else if (data.status === 'CLOSE') {
      // 마감일 때
      const openClose = await this.getOpenClose(shop.id);
      if (!openClose) {
        throw new Error('The store is already close');
      }

      openClose.update({
        close_time: moment().toDate(),
      });
    }

    return { message: 'success' };
  }

  async getOpenClose(shopId: number) {
    const openClose = await this.shopOpenCloseModel.findOne({
      where: {
        shop_id: shopId,
        close_time: null,
      },
    });

    return openClose;
  }
}
