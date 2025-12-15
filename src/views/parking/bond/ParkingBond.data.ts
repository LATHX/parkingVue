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
  },
  {
    title: '保证金金额',
    align: 'center',
    dataIndex: 'balance',
  },
];

// 高级查询数据
export const superQuerySchema = {
  parkingId: {
    title: '停车场id',
    order: 0,
    view: 'sel_search',
    type: 'string',
    dictTable: 'parking_lot',
    dictCode: 'id',
    dictText: 'parking_name',
  },
};
