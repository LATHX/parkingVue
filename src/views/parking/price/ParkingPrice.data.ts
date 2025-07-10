import { BasicColumn } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '停车场',
    align: 'center',
    dataIndex: 'parkingId_dictText',
  },
  {
    title: '停车场类型',
    align: 'center',
    dataIndex: 'parkingType_dictText',
  },
  {
    title: '第一天总价',
    align: 'center',
    dataIndex: 'parkingPriceSum1',
  },
  {
    title: '第二天总价',
    align: 'center',
    dataIndex: 'parkingPriceSum2',
  },
  {
    title: '第三天总价',
    align: 'center',
    dataIndex: 'parkingPriceSum3',
  },
  {
    title: '第四天总价',
    align: 'center',
    dataIndex: 'parkingPriceSum4',
  },
  {
    title: '第五天总价',
    align: 'center',
    dataIndex: 'parkingPriceSum5',
  },
  {
    title: '第六天总价',
    align: 'center',
    dataIndex: 'parkingPriceSum6',
  },
  {
    title: '第七天总价',
    align: 'center',
    dataIndex: 'parkingPriceSum7',
  },
  {
    title: '在X天后',
    align: 'center',
    dataIndex: 'afterDay',
  },
  {
    title: '在X天后每天价格',
    align: 'center',
    dataIndex: 'afterDailyPrice',
  },
  {
    title: '调价类型',
    align: 'center',
    dataIndex: 'adjustPriceType',
  },
  {
    title: '调整价格',
    align: 'center',
    dataIndex: 'adjustPrice',
  },
  {
    title: '调价开始日',
    align: 'center',
    dataIndex: 'adjustStartDate',
    customRender: ({ text }) => {
      text = !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
      return text;
    },
  },
  {
    title: '调价结束日',
    align: 'center',
    dataIndex: 'adjustEndDate',
    customRender: ({ text }) => {
      text = !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
      return text;
    },
  },
  {
    title: '审核状态',
    align: 'center',
    dataIndex: 'auditStatus_dictText',
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
  parkingType: { title: '停车场类型', order: 1, view: 'text', type: 'string', dictCode: 'parking_lot,parking_name,id' },
  adjustPriceType: { title: '调价类型', order: 11, view: 'text', type: 'string', dictCode: 'adjust_price_type' },
  auditStatus: { title: '审核状态', order: 15, view: 'list', type: 'string', dictCode: 'audit_status' },
  businessType: { title: '营业类型', order: 16, view: 'list', type: 'string', dictCode: 'business_type' },
  businessStatus: { title: '营业状态', order: 19, view: 'list', type: 'string', dictCode: 'audit_status' },
};
