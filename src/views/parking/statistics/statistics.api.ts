import { defHttp } from '/@/utils/http/axios';

enum Api {
  queryDataStatistics = '/parking/statistics/queryDataStatistics',
  queryOrderChartStatistics = '/parking/statistics/queryOrderChartStatistics',
  queryTop5CityOrderStatistics = '/parking/statistics/queryTop5CityOrderStatistics',
  queryNewOrderStatistics = '/parking/parkingOrder/list',
}

/**
 * 统计数据接口
 * @param params
 */
export const queryDataStatistics = (params?) => defHttp.get({ url: Api.queryDataStatistics, params });

/**
 * 订单统计图表接口
 * @param params { type: 'D' | 'M' | 'Y' }
 */
export const queryOrderChartStatistics = (params: { type: string }) => defHttp.get({ url: Api.queryOrderChartStatistics, params });

/**
 * 订单量前五城市接口
 * @param params
 */
export const queryTop5CityOrderStatistics = (params?) => defHttp.get({ url: Api.queryTop5CityOrderStatistics, params });

/**
 * 最新订单接口
 * @param params
 */
export const queryNewOrderStatistics = (params?) => defHttp.get({ url: Api.queryNewOrderStatistics, params: { pageNo: 1, pageSize: 4, column: 'createTime', order: 'desc', ...params } });

/**
 * 入驻车场类型统计接口
 * @param params
 */
export const queryLocationTypeStatistics = (params?) => defHttp.get({ url: '/parking/statistics/queryLocationTypeStatistics', params });

/**
 * 入驻车场前五城市占比接口
 * @param params
 */
export const queryCityLotStatistics = (params?) => defHttp.get({ url: '/parking/statistics/queryCityLotStatistics', params });

/**
 * 用户统计接口
 * @param params
 */
export const queryUserMerchantStats = (params?) => defHttp.get({ url: '/parking/statistics/queryUserMerchantStats', params });

/**
 * 顾客前十城市接口
 * @param params
 */
export const queryCustomerCityStats = (params?) => defHttp.get({ url: '/parking/statistics/queryCustomerCityStats', params });
