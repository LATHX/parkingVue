import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '优惠卷名称',
    align: 'center',
    dataIndex: 'couponName',
  },
  {
    title: '优惠卷类型',
    align: 'center',
    dataIndex: 'couponType_dictText',
  },
  {
    title: '优惠卷金额/折扣',
    align: 'center',
    dataIndex: 'discountPrice',
  },
  {
    title: '最大可扣除金额',
    align: 'center',
    dataIndex: 'maxPrice',
  },
  {
    title: '满足可用金额',
    align: 'center',
    dataIndex: 'limitPrice',
  },
  {
    title: '开始时间',
    align: 'center',
    dataIndex: 'startTime',
  },
  {
    title: '结束时间',
    align: 'center',
    dataIndex: 'endTime',
  },
  {
    title: '平台承担比例',
    align: 'center',
    dataIndex: 'platformRate',
  },
  {
    title: '商家承担比例',
    align: 'center',
    dataIndex: 'merchantRate',
  },
  {
    title: '自动发送',
    align: 'center',
    dataIndex: 'autoSend_dictText',
  },
];

// 高级查询数据
export const superQuerySchema = {
  couponName: { title: '优惠卷名称', order: 0, view: 'text', type: 'string' },
  startTime: { title: '开始时间', order: 1, view: 'datetime', type: 'string' },
  endTime: { title: '结束时间', order: 2, view: 'datetime', type: 'string' },
  discountPrice: { title: '优惠卷金额/折扣', order: 3, view: 'number', type: 'number' },
  maxPrice: { title: '最大可扣除金额', order: 4, view: 'number', type: 'number' },
  limitPrice: { title: '满足可用金额', order: 5, view: 'number', type: 'number' },
  autoSend: { title: '自动发送', order: 6, view: 'sel_search', type: 'string', dictCode: 'yn' },
};
