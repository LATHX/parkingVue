import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '订单时间',
    align: 'center',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '订单号',
    align: 'center',
    dataIndex: 'id',
    width: 180,
  },
  {
    title: '优惠券金额',
    align: 'center',
    dataIndex: 'couponPrice',
  },
  {
    title: '平台承担',
    align: 'center',
    dataIndex: 'platformSubsidy',
  },
  {
    title: '商家承担',
    align: 'center',
    dataIndex: 'merchantSubsidy',
  },
  {
    title: '应付金额',
    align: 'center',
    dataIndex: 'payablePrice',
  },
  {
    title: '首付金额',
    align: 'center',
    dataIndex: 'firstRealPrice',
  },
  {
    title: '尾款金额',
    align: 'center',
    dataIndex: 'secondRealPrice',
  },
  {
    title: '平台分成',
    align: 'center',
    dataIndex: 'settlementServicePrice',
  },
  {
    title: '车场分成',
    align: 'center',
    dataIndex: 'settlementPrice',
  },
];

// 高级查询数据
export const superQuerySchema = {
  id: { title: '订单号', order: 0, view: 'text', type: 'string' },
  parkingName: { title: '停车场名称', order: 0, view: 'text', type: 'string' },
  userId: { title: '用户手机号', order: 2, view: 'sel_search', type: 'string', dictCode: 'parking_customer,phone,id' },
  payStatus: { title: '支付状态', order: 3, view: 'sel_search', type: 'string', dictCode: 'pay_status' },
  carStatus: { title: '车辆状态', order: 4, view: 'sel_search', type: 'string', dictCode: 'car_status' },
  carPlate: { title: '车牌号', order: 10, view: 'text', type: 'string' },
  createTime: { title: '创建时间', order: 10, view: 'datetime', type: 'string' },
  isSettlement: { title: '是否已结算', order: 23, view: 'sel_search', type: 'string', dictCode: 'yn' },
};
