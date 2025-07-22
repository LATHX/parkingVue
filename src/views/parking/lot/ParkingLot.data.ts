import { BasicColumn } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '车场名称',
    align: 'center',
    dataIndex: 'parkingName',
  },
  {
    title: '车场位置',
    align: 'center',
    dataIndex: 'parkingLocationId_dictText',
  },
  {
    title: '紧急联系人',
    align: 'center',
    dataIndex: 'contact',
  },
  {
    title: '紧急联系人电话',
    align: 'center',
    dataIndex: 'phone',
  },
  {
    title: '排序',
    align: 'center',
    sorter: true,
    dataIndex: 'orderNum',
  },
  {
    title: '当前休息状态',
    align: 'center',
    dataIndex: 'isRestValue_dictText',
  },
  {
    title: '审核状态',
    align: 'center',
    width: '85px',
    dataIndex: 'auditStatus_dictText',
    fixed: 'right',
  },
];

// 高级查询数据
export const superQuerySchema = {
  parkingName: { title: '车场名称', order: 1, view: 'text', type: 'string' },
  isSupportCoupon: { title: '可用优惠卷', order: 8, view: 'number', type: 'number', dictCode: 'yn' },
  contact: { title: '紧急联系人', order: 10, view: 'text', type: 'string' },
  phone: { title: '紧急联系人电话', order: 11, view: 'text', type: 'string' },
  transferType: { title: '接送类型', order: 16, view: 'number', type: 'number' },
  transferStartTime: { title: '接送开始时间', order: 17, view: 'date', type: 'string' },
  transferEndTime: { title: '接送结束时间', order: 18, view: 'date', type: 'string' },
  parkingLocationId: {
    title: '车场位置',
    order: 20,
    view: 'list',
    type: 'string',
    dictCode: 'parking_location,location_name,id',
  },
  orderNum: { title: '排序', order: 28, view: 'number', type: 'number' },
  auditStatus: { title: '审核状态', order: 29, view: 'number', type: 'number', dictCode: 'audit_status' },
};
