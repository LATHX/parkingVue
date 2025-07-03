import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '停车场',
    align: 'center',
    dataIndex: 'parkingId_dictText',
  },
  {
    title: '用户',
    align: 'center',
    dataIndex: 'userId_dictText',
  },
  {
    title: '星级',
    align: 'center',
    dataIndex: 'star_dictText',
  },
  {
    title: '评价内容',
    align: 'center',
    dataIndex: 'content',
  },
  {
    title: '评价类型',
    align: 'center',
    dataIndex: 'evaluateType_dictText',
  },
];

// 高级查询数据
export const superQuerySchema = {
  parkingId: {
    title: '停车场Id',
    order: 0,
    view: 'sel_search',
    type: 'string',
    dictTable: 'parking_lot',
    dictCode: 'id',
    dictText: 'parking_name',
  },
  userId: {
    title: '用户Id',
    order: 1,
    view: 'sel_search',
    type: 'string',
    dictTable: 'parking_customer',
    dictCode: 'id',
    dictText: 'phone',
  },
  star: { title: '星级', order: 3, view: 'number', type: 'number', dictCode: 'evaluate_star' },
  content: { title: '评价内容', order: 4, view: 'text', type: 'string' },
  evaluateType: { title: '评价类型', order: 5, view: 'sel_search', type: 'string', dictCode: 'evaluate_type' },
  orderId: { title: '订单号', order: 6, view: 'sel_search', type: 'string', dictCode: '' },
};
