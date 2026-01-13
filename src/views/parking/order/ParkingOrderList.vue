<template>
  <div class="p-2 parking-order-list">
    <!-- Top Stats -->
    <OrderStats />

    <!--引用表格-->
    <BasicTable @register="registerTable" :min-height="644">
      <!--插槽:table标题-->
      <template #tableTitle>
        <div class="custom-toolbar">
          <div class="page-title">车场订单</div>
        </div>
      </template>
      
      <!-- Custom Toolbar -->
      <template #toolbar>
        <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam">
          <div class="custom-toolbar">
            <div class="filters">
            <div style="width: 260px; margin-right: 10px">
                <j-search-select
                v-model:value="queryParam.parkingId"
                dict="parking_lot,parking_name,id"
                placeholder="请输入车场名称检索"
                class="filter-item"
                @change="handleParkingIdSelect"
              />
              </div>
              
              <!-- <div class="filter-item">
                <a-range-picker v-model:value="queryParam.createTimeRange" value-format="YYYY-MM-DD" />
              </div> -->
              
              <div class="filter-item status-select">
                <j-dict-select-tag v-model:value="queryParam.carStatus" dictCode="car_status" placeholder="车辆状态" @change="handleCarStatus"/>
              </div>
              
              <div class="filter-item status-select">
                <j-dict-select-tag v-model:value="queryParam.payStatus" dictCode="pay_status" placeholder="订单状态" @change="handlePayStatus"/>
              </div>
            </div>

            <div class="actions">
              <a-button @click="searchReset">重置</a-button>
              <a-button @click="onExportXls">导出</a-button>
              <a-button type="primary" @click="handleAdd">新增</a-button>
            </div>
          </div>
        </a-form>
      </template>

      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <ParkingOrderModal ref="registerModal" @success="handleSuccess"></ParkingOrderModal>
    <ParkingManualOrderModal ref="manualOrderModal" @success="handleSuccess"></ParkingManualOrderModal>
  </div>
</template>

<script lang="ts" name="parking-parkingOrder" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, superQuerySchema } from './ParkingOrder.data';
  import {
    list,
    deleteOne,
    batchDelete,
    getImportUrl,
    getExportUrl,
    carEnterStatus,
    carLeaveStatus,
    cancelOrder,
    sendSms,
    systemCompleteOrder,
  } from './ParkingOrder.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import ParkingOrderModal from './components/ParkingOrderModal.vue';
  import ParkingManualOrderModal from './components/ParkingManualOrderModal.vue';
  import JSearchSelect from '/@/components/Form/src/jeecg/components/JSearchSelect.vue';
  import OrderStats from './components/OrderStats.vue';
  import { useUserStore } from '/@/store/modules/user';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { DatePicker } from 'ant-design-vue';

  const ARangePicker = DatePicker.RangePicker;

  const formRef = ref();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const manualOrderModal = ref();
  const userStore = useUserStore();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '订单表',
      api: list,
      columns,
      canResize: false,
      useSearchForm: false,
      showIndexColumn: true,
      clickToRowSelect: false,
      tableSetting: {
        redo: false,
        size: false,
        setting: false,
        fullScreen: false,
      },
      actionColumn: {
        width: 200,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        // Handle Date Range
        if (queryParam.createTimeRange && queryParam.createTimeRange.length === 2) {
            params.createTime_begin = queryParam.createTimeRange[0];
            params.createTime_end = queryParam.createTimeRange[1];
        }
        return Object.assign(params, queryParam);
      },
    },
    exportConfig: {
      name: '订单表',
      url: getExportUrl,
      params: queryParam,
    },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess,
    },
  });
  const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRowKeys }] =
    tableContext;
  const labelCol = reactive({
    xs: 24,
    sm: 4,
    xl: 6,
    xxl: 4,
  });
  const wrapperCol = reactive({
    xs: 24,
    sm: 20,
  });

  // 高级查询配置
  const superQueryConfig = reactive(superQuerySchema);

  /**
   * 高级查询事件
   */
  function handleSuperQuery(params) {
    Object.keys(params).map((k) => {
      queryParam[k] = params[k];
    });
    searchQuery();
  }

  /**
   * 新增事件
   */
  function handleAdd() {
    manualOrderModal.value.disableSubmit = false;
    manualOrderModal.value.add();
  }

  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    registerModal.value.disableSubmit = false;
    registerModal.value.edit(record);
  }

  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    registerModal.value.disableSubmit = true;
    registerModal.value.edit(record);
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  }

  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
  }

  async function cancelOrderHandle(record) {
    await cancelOrder({ orderId: record.id }, handleSuccess);
  }

  async function carEnterStatusHandle(record) {
    console.log(record);
    await carEnterStatus({ orderId: record.id }, handleSuccess);
  }

  async function carLeaveStatusHandle(record) {
    await carLeaveStatus({ orderId: record.id }, handleSuccess);
  }
  async function systemCompleteHandle(record) {
    await systemCompleteOrder({ orderId: record.id }, handleSuccess);
  }

  async function resendSmsHandle(record) {
    await sendSms({ id: record.id }, handleSuccess);
  }

  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }
 function handleParkingIdSelect(val) {
    queryParam.parkingId = val;
    searchQuery()
  } 
  function handleCarStatus(val) {
    queryParam.carStatus = val;
    searchQuery()
  } 
  function handlePayStatus(val) {
    queryParam.payStatus = val;
    searchQuery()
  }
  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        tooltip: '详情',
        onClick: handleDetail.bind(null, record),
        icon: 'mdi:eye',
      },
      {
        tooltip: '车辆入场',
        popConfirm: {
          title: '是否确认车辆入场',
          confirm: carEnterStatusHandle.bind(null, record),
          placement: 'topLeft',
        },
        icon: 'mdi:login-variant',
        ifShow: () => record.payStatus === '1' && record.carStatus === '0',
      },
      {
        tooltip: '车辆离场',
        popConfirm: {
          title: '是否确认车辆离场',
          confirm: carLeaveStatusHandle.bind(null, record),
          placement: 'topLeft',
        },
        icon: 'mdi:logout-variant',
        ifShow: () => (record.payStatus === '1' || record.payStatus === '2') && record.carStatus === '1',
      },
      {
        tooltip: '系统结单',
        popConfirm: {
          title: '是否确认系统结单',
          confirm: systemCompleteHandle.bind(null, record),
          placement: 'topLeft',
        },
        icon: 'material-symbols:task-outline',
        ifShow: () => (record.payStatus === '1' || record.payStatus === '2' || record.payStatus === '7') && record.carStatus === '1',
      },
      {
        tooltip: '退款订单',
        popConfirm: {
          title: '是否确认退款订单',
          confirm: cancelOrderHandle.bind(null, record),
          placement: 'topLeft',
        },
        icon: 'mdi:cash-refund',
        ifShow: () => ['1', '2', '3'].includes(record.payStatus) && record.carStatus !== '2', // Assuming '2' is left? Logic kept from original
      },
         {
        tooltip: '重发短信',
        popConfirm: {
          title: '是否确认重发短信',
          confirm: resendSmsHandle.bind(null, record),
          placement: 'topLeft',
        },
        icon: 'mdi:message-text-outline'  },
    ];
  }

  /**
   * 下拉操作栏 - Not used in new design, moved to inline actions
   */
  function getDropDownAction(record) {
    return [];
  }

  /**
   * 查询
   */
  function searchQuery() {
    reload();
  }

  /**
   * 重置
   */
  function searchReset() {
    formRef.value.resetFields();
    selectedRowKeys.value = [];
    queryParam.parkingId = undefined;
    queryParam.createTimeRange = undefined;
    queryParam.carStatus = undefined;
    queryParam.payStatus = undefined;
    //刷新数据
    reload();
  }
</script>

<style lang="less" scoped>
  .parking-order-list {
    .custom-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 0px;

      .page-title {
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }
      
      .filters {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          
          .search-input-wrapper {
              width: 260px;
              .search-input {
                width: 100%;
                border-radius: 4px;
              }
          }
          
          .filter-item {
              &.status-select {
                  width: 120px;
              }
          }
      }

      .actions {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-left: 10px;
      }
    }
  }

  /* Override basic table default padding/margin if needed */
  :deep(.jeecg-basic-table-form-container) {
    padding: 0;
  }
</style>
