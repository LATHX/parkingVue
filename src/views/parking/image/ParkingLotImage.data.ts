import { BasicColumn } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '停车场名称',
    align: 'center',
    dataIndex: 'parkingId_dictText',
  },
  {
    title: '停车场内部图',
    align: 'center',
    dataIndex: 'innerImg',
    customRender: render.renderImage,
  },
  {
    title: '停车场出入口',
    align: 'center',
    dataIndex: 'exitImg',
    customRender: render.renderImage,
  },
  {
    title: '接送车图',
    align: 'center',
    dataIndex: 'transferCarImg',
    customRender: render.renderImage,
  },
  {
    title: '监控室图',
    align: 'center',
    dataIndex: 'secureImg',
    customRender: render.renderImage,
  },
  {
    title: '休息室图',
    align: 'center',
    dataIndex: 'breakroomImg',
    customRender: render.renderImage,
  },
  {
    title: '其它图片',
    align: 'center',
    dataIndex: 'otherImg',
    customRender: render.renderImage,
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
  auditStatus: { title: '审核状态', order: 8, view: 'number', type: 'number', dictCode: '' },
};
