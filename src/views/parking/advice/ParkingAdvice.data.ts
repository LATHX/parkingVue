import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '建议内容',
    align: "center",
    dataIndex: 'content'
  },
];

// 高级查询数据
export const superQuerySchema = {
  content: {title: '建议内容',order: 0,view: 'text', type: 'string',},
};
