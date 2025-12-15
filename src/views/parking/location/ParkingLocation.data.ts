import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '车场地点',
    align: 'center',
    dataIndex: 'locationName',
  },
  {
    title: '城市',
    align: 'center',
    dataIndex: 'city',
  },
  {
    title: '图片',
    align: 'center',
    dataIndex: 'image',
    customRender: ({ text }) => {
      return text ? render.renderImage({ text }) : '无图片';
    },
  },
  {
    title: '场地类型',
    align: 'center',
    dataIndex: 'locationType_dictText',
  },
  {
    title: '展示在首页',
    align: 'center',
    dataIndex: 'showHomePage_dictText',
  },
  {
    title: '排序序号',
    align: 'center',
    dataIndex: 'orderNum',
  },
];

// 高级查询数据
export const superQuerySchema = {
  locationName: { title: '车场地点', order: 0, view: 'text', type: 'string' },
  showHomePage: { title: '展示在首页', order: 1, view: 'list', type: 'string', dictCode: 'yn' },
};
