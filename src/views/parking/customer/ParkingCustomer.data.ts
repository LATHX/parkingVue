import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '用户ID',
    align: 'center',
    dataIndex: 'id',
  },
  {
    title: '手机号',
    align: 'center',
    dataIndex: 'phone',
  },
  {
    title: '注册日期',
    align: 'center',
    dataIndex: 'createTime',
  },
  {
    title: '最近更新日期',
    align: 'center',
    dataIndex: 'updateTime',
  },
  {
    title: '启用',
    align: 'center',
    dataIndex: 'status_dictText'
  },
];

// 高级查询数据
export const superQuerySchema = {
  id: { title: '用户ID', order: 0, view: 'text', type: 'string' },
  phone: { title: '手机号', order: 1, view: 'text', type: 'string' },
  createTime: { title: '注册日期', order: 2, view: 'date', type: 'string' },
};
