import { Op } from 'sequelize';
import { FilterInput } from './graphql/filter-type';

export function buildWhereClause(filters: FilterInput[]) {
  const whereClause = {};

  filters.forEach((element) => {
    // between 일 때
    if (element.operator === 'between') {
      const betweenDate = element.value.split(',');
      whereClause[element.field] = {
        [Op.gte]: betweenDate[0],
        [Op.lte]: betweenDate[1],
      };
    }
  });

  return whereClause;
}
