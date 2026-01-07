import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/parking/parkingOrder/list',
  save = '/parking/parkingOrder/add',
  edit = '/parking/parkingOrder/edit',
  deleteOne = '/parking/parkingOrder/delete',
  deleteBatch = '/parking/parkingOrder/deleteBatch',
  importExcel = '/parking/parkingOrder/importExcel',
  exportXls = '/parking/parkingOrder/exportXls',
  cancelOrder = '/parking/parkingOrder/cancelOrder',
  carEnterStatus = '/parking/parkingOrder/carEnterStatus',
  carLeaveStatus = '/parking/parkingOrder/carLeaveStatus',
  systemCompleteOrder = '/parking/parkingOrder/systemCompleteOrder',
}

/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;

/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;

export const cancelOrder = (params, handleSuccess) => {
  defHttp.post({ url: Api.cancelOrder, params: params }).then(() => {
    handleSuccess();
  });
};
export const systemCompleteOrder = (params, handleSuccess) => {
  defHttp.post({ url: Api.systemCompleteOrder, params: params }).then(() => {
    handleSuccess();
  });
};
export const carEnterStatus = (params, handleSuccess) => {
  defHttp.post({ url: Api.carEnterStatus, params: params }).then(() => {
    handleSuccess();
  });
};
export const carLeaveStatus = (params, handleSuccess) => {
  defHttp.post({ url: Api.carLeaveStatus, params: params }).then(() => {
    handleSuccess();
  });
};

/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * 删除单个
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * 批量删除
 * @param params
 * @param handleSuccess
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};

/**
 * 保存或者更新
 * @param params
 * @param isUpdate
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
};
