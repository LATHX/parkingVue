import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '用户手机号',
    align: 'center',
    dataIndex: 'userId_dictText',
  },
  {
    title: '优惠卷id',
    align: 'center',
    dataIndex: 'couponId',
  },
  {
    title: '优惠卷名',
    align: 'center',
    dataIndex: 'couponId_dictText',
  },
  {
    title: '开始时间',
    align: 'center',
    dataIndex: 'startTime',
  },
  {
    title: '结束时间',
    align: 'center',
    dataIndex: 'endTime',
  },
  {
    title: '优惠卷状态',
    align: 'center',
    dataIndex: 'couponStatus_dictText',
  },
];

// 高级查询数据
export const superQuerySchema = {
  userId: {
    title: '用户id',
    order: 0,
    view: 'sel_search',
    type: 'string',
    dictTable: 'parking_customer',
    dictCode: 'id',
    dictText: 'phone',
  },
  startTime: { title: '开始时间', order: 1, view: 'datetime', type: 'string' },
  endTime: { title: '结束时间', order: 2, view: 'datetime', type: 'string' },
  couponStatus: { title: '优惠卷状态', order: 3, view: 'sel_search', type: 'string', dictCode: 'coupon_status' },
};
