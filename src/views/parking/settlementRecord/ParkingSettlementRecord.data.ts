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
    title: '开始日期',
    align: 'center',
    dataIndex: 'startDate',
  },
  {
    title: '结束日期',
    align: 'center',
    dataIndex: 'endDate',
  },
  {
    title: '结算金额',
    align: 'center',
    dataIndex: 'balance',
  },
  {
    title: '是否结算',
    align: 'center',
    dataIndex: 'isSettlement_dictText',
  },
  {
    title: '系统完成结算',
    align: 'center',
    dataIndex: 'isComplete_dictText',
  },
];

// 高级查询数据
export const superQuerySchema = {
  balance: { title: '结算金额', order: 0, view: 'text', type: 'string' },
  isSettlement: { title: '是否结算', order: 1, view: 'text', type: 'string' },
};
