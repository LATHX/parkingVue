import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '停车场名称',
    align: 'center',
    dataIndex: 'parkingId_dictText',
    width: 150,
  },
  {
    title: '结算周期',
    align: 'center',
    dataIndex: 'startDate',
    width: 150,
    customRender: ({ record }) => {
      return record.startDate + ' 至 ' + record.endDate;
    },
  },
  {
    title: '订单总数',
    align: 'center',
    dataIndex: 'orderCount',
    width: 100,
  },
  {
    title: '订单金额',
    align: 'center',
    dataIndex: 'totalBalance',
    width: 100,
  },
  {
    title: '结算金额',
    align: 'center',
    dataIndex: 'balance',
    width: 100,
  },
   {
    title: '渠道费率',
    align: 'center',
    dataIndex: 'payTypeRate',
    width: 60,
    customRender: ({ record }) => {
      return record.payTypeRate + '‰';
    },
  },
   {
    title: '渠道金额',
    align: 'center',
    dataIndex: 'payTypeBalance',
    width: 60,
  },
  {
    title: '平台分成',
    align: 'center',
    dataIndex: 'platformSettlementBalance',
    width: 100,
  },
  {
    title: '车场最终结算',
    align: 'center',
    dataIndex: 'merchantSettlementBalance',
    width: 100,
  },
  {
    title: '结算状态',
    align: 'center',
    dataIndex: 'isSettlement_dictText',
    width: 60,
  },
];

// 高级查询数据
export const superQuerySchema = {
  balance: { title: '结算金额', order: 0, view: 'text', type: 'string' },
  isSettlement: { title: '是否结算', order: 1, view: 'text', type: 'string' },
};
