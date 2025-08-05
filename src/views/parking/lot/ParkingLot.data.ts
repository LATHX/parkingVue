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
  parkingLocationId: {
    title: '车场位置',
    order: 20,
    view: 'list',
    type: 'string',
    dictCode: 'parking_location,location_name,id',
  },
  auditStatus: { title: '审核状态', order: 29, view: 'number', type: 'number', dictCode: 'audit_status' },
};
