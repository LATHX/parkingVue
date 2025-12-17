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
    title: '服务费率(百分)',
    align: 'center',
    dataIndex: 'serviceFeeRate',
  },
  {
    title: '支付渠道费率(千分)',
    align: 'center',
    dataIndex: 'payTypeRate',
  },
  {
    title: '结算周期',
    align: 'center',
    dataIndex: 'settlementCycle_dictText',
  },
];

// 高级查询数据
export const superQuerySchema = {
  serviceFeeRate: { title: '服务费率', order: 0, view: 'number', type: 'number' },
  payTypeRate: { title: '支付渠道费率', order: 1, view: 'number', type: 'number' },
  settlementDay: { title: '结算周期(日)', order: 2, view: 'number', type: 'number' },
};
