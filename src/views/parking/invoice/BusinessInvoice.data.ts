import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '申请日期',
    align: 'center',
    dataIndex: 'createTime',
  },
  {
    title: '发票类型',
    align: 'center',
    dataIndex: 'type_dictText',
  },
  {
    title: '发票抬头',
    align: 'center',
    dataIndex: 'title',
  },
  {
    title: '发票税号',
    align: 'center',
    dataIndex: 'tax',
  },
    {
    title: '发票金额',
    align: 'center',
    dataIndex: 'invoicePrice',
  },
  {
    title: '联系电话',
    align: 'center',
    dataIndex: 'phone',
  },
  {
    title: '电子邮箱',
    align: 'center',
    dataIndex: 'mail',
  },
  {
    title: '发票状态',
    align: 'center',
    dataIndex: 'status_dictText',
  },
];

// 高级查询数据
export const superQuerySchema = {
  type: {title: '发票类型(0个人,1企业)',order: 0,view: 'text', type: 'string',},
  title: {title: '发票抬头',order: 1,view: 'text', type: 'string',},
  tax: {title: '发票税号',order: 2,view: 'text', type: 'string',},
  address: {title: '地址',order: 3,view: 'text', type: 'string',},
  phone: {title: '手机号',order: 4,view: 'text', type: 'string',},
  bankName: {title: '银行名',order: 5,view: 'text', type: 'string',},
  bankAccount: {title: '银行帐号',order: 6,view: 'text', type: 'string',},
  orderId: {title: '订单号',order: 7,view: 'text', type: 'string',},
  invoicePrice: {title: '发票金额',order: 8,view: 'number', type: 'number',},
  status: {title: '发票状态',order: 9,view: 'text', type: 'string',},
  mail: {title: '收票邮箱',order: 10,view: 'text', type: 'string',},
  remark: {title: '备注',order: 11,view: 'textarea', type: 'string',},
  resendStatus: {title: '重发状态 0否1是',order: 12,view: 'text', type: 'string',},
  invoiceSource: {title: '发票处理方',order: 13,view: 'text', type: 'string',},
  orderSource: {title: '订单来源',order: 14,view: 'text', type: 'string',},
};
