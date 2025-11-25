import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '订单号',
    align: 'center',
    dataIndex: 'id',
    width: 180,
  },
  {
    title: '支付方式',
    align: 'center',
    dataIndex: 'payType_dictText',
  },
  {
    title: '车辆状态',
    align: 'center',
    dataIndex: 'carStatus_dictText',
  },
  {
    title: '手机号',
    align: 'center',
    dataIndex: 'userId_dictText',
  },
  {
    title: '商家名',
    align: 'center',
    dataIndex: 'merchantId_dictText',
  },
  {
    title: '停车场',
    align: 'center',
    dataIndex: 'parkingName',
  },
  {
    title: '车位类型',
    align: 'center',
    dataIndex: 'parkingType_dictText',
  },
  {
    title: '车牌号',
    align: 'center',
    dataIndex: 'carPlate',
  },
  {
    title: '出行人数',
    align: 'center',
    dataIndex: 'peopleCount',
  },

  {
    title: '支付状态',
    align: 'center',
    dataIndex: 'payStatus_dictText',
  },

  {
    title: '预计进场时间',
    align: 'center',
    dataIndex: 'predictStartDate',
  },
  {
    title: '预计离场时间',
    align: 'center',
    dataIndex: 'predictEndDate',
  },
  {
    title: '预计停车天数/小时',
    align: 'center',
    dataIndex: 'predictTotalDay',
  },
  {
    title: '实际进场时间',
    align: 'center',
    dataIndex: 'realStartDate',
  },
  {
    title: '实际离场时间',
    align: 'center',
    dataIndex: 'realEndDate',
  },
  {
    title: '实际停车天数',
    align: 'center',
    dataIndex: 'realTotalDay',
  },
  {
    title: '优惠卷ID',
    align: 'center',
    dataIndex: 'couponId',
  },
  {
    title: '优惠卷金额',
    align: 'center',
    dataIndex: 'couponPrice',
  },
  {
    title: '平台承担优惠卷金额',
    align: 'center',
    dataIndex: 'settlementPlatformCouponPrice',
  },
  {
    title: '商家承担优惠卷金额',
    align: 'center',
    dataIndex: 'settlementMerchantCouponPrice',
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
    title: '结算服务费率',
    align: 'center',
    dataIndex: 'settlementServiceRate',
  },
  {
    title: '结算服务费',
    align: 'center',
    dataIndex: 'settlementServicePrice',
  },
  {
    title: '支付渠道费率',
    align: 'center',
    dataIndex: 'settlementRate',
  },
  {
    title: '支付渠道金额',
    align: 'center',
    dataIndex: 'settlementRatePrice',
  },
  {
    title: '结算金额',
    align: 'center',
    dataIndex: 'settlementPrice',
  },
  {
    title: '结算日期',
    align: 'center',
    dataIndex: 'settlementDate',
  },
  {
    title: '是否已结算',
    align: 'center',
    dataIndex: 'isSettlement_dictText',
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
