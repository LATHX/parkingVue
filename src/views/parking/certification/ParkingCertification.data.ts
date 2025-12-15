import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '停车场名称',
    align: 'center',
    dataIndex: 'parkingId_dictText',
  },
  {
    title: '营业执照',
    align: 'center',
    dataIndex: 'businessCertification',
    customRender: render.renderImage,
  },
  {
    title: '身份证正面',
    align: 'center',
    dataIndex: 'identifyCertificationFront',
    customRender: render.renderImage,
  },
  {
    title: '身份证反面',
    align: 'center',
    dataIndex: 'identifyCertificationBack',
    customRender: render.renderImage,
  },
  {
    title: '场地证明',
    align: 'center',
    dataIndex: 'parkingCertification',
    customRender: render.renderImage,
  },
  {
    title: '车辆保险证明',
    align: 'center',
    dataIndex: 'carInsuranceCertification',
    customRender: render.renderImage,
  },
  {
    title: '审核状态',
    align: 'center',
    dataIndex: 'auditStatus_dictText',
    fixed: 'right',
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
