import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '流水号',
    align: 'center',
    dataIndex: 'id',
    width: 180,
  },
  {
    title: '订单号',
    align: 'center',
    dataIndex: 'orderId',
    width: 180,
  },
  {
    title: '付款类型',
    align: 'center',
    dataIndex: 'times_dictText',
  },
  {
    title: '支付金额',
    align: 'center',
    dataIndex: 'price',
  },
  {
    title: '退款金额',
    align: 'center',
    dataIndex: 'refundPrice',
  },
  {
    title: '剩余金额',
    align: 'center',
    dataIndex: 'remainPrice',
  },
  {
    title: '是否完成',
    align: 'center',
    dataIndex: 'isFinished_dictText',
  },
];

// 高级查询数据
export const superQuerySchema = {
  orderId: { title: '订单号', order: 2, view: 'text', type: 'string' },
};
