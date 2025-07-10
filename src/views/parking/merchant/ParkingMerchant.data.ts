import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '微信绑定openId',
    align: "center",
    dataIndex: 'openId'
  },
  {
    title: '微信绑定unionId',
    align: "center",
    dataIndex: 'unionId'
  },
  {
    title: '城市',
    align: "center",
    dataIndex: 'city'
  },
  {
    title: '是否可用',
    align: "center",
    dataIndex: 'status'
  },
  {
    title: '父账号',
    align: "center",
    dataIndex: 'parentId'
  },
];

// 高级查询数据
export const superQuerySchema = {
  openId: {title: '微信绑定openId',order: 0,view: 'text', type: 'string',},
  unionId: {title: '微信绑定unionId',order: 1,view: 'text', type: 'string',},
  city: {title: '城市',order: 2,view: 'text', type: 'string',},
  status: {title: '是否可用',order: 3,view: 'text', type: 'string',},
  parentId: {title: '父账号',order: 4,view: 'text', type: 'string',},
};
