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
    title: '车牌号',
    align: 'center',
    dataIndex: 'carPlate',
  },
  {
    title: '是否默认',
    align: 'center',
    dataIndex: 'isDefault_dictText',
  },
];

// 高级查询数据
export const superQuerySchema = {
  userId: { title: '用户手机号', order: 0, view: 'sel_search', type: 'string', dictCode: 'parking_customer,phone,id' },
  carPlate: { title: '车牌号', order: 1, view: 'text', type: 'string' },
};
