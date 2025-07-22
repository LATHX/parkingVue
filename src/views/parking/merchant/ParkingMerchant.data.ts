import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '名称',
    align: 'center',
    dataIndex: 'merchantName',
  },
  {
    title: '手机号',
    align: 'center',
    dataIndex: 'phone',
  },
  {
    title: '城市',
    align: 'center',
    dataIndex: 'city',
  },
  {
    title: '是否可用',
    align: 'center',
    dataIndex: 'status_dictText',
  },
  {
    title: '父账号',
    align: 'center',
    dataIndex: 'parentId_dictText',
  },
];

// 高级查询数据
export const superQuerySchema = {
  merchantName: { title: '名称', order: 0, view: 'text', type: 'string' },
  phone: { title: '手机号', order: 1, view: 'text', type: 'string' },
  city: { title: '城市', order: 2, view: 'sel_search', type: 'string', dictCode: 'city' },
  parentId: { title: '父账号', order: 4, view: 'sel_search', type: 'string', dictCode: 'parking_merchant,phone,id' },
};
