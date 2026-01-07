<template>
  <div class="p-2 parking-order-list">
    <!-- Top Stats -->
    <OrderSettlementListStats
      :totalOrders="stats.totalOrders"
      :statusStats="stats.statusStats"
      :orderAmount="stats.orderAmount"
      :platformShare="stats.platformShare"
      :parkingSettlement="stats.parkingSettlement"
      :parkingId="parkingId"
      :settlementId="settlementId"
      @dateTypeChange="handleDateTypeChange"
    />

    <!--引用表格-->
    <BasicTable @register="registerTable" :min-height="644">
      <!--插槽:table标题-->
      <template #tableTitle>
        <div class="custom-toolbar">
          <div class="page-title">订单列表</div>
        </div>
      </template>
      
      <!-- Custom Toolbar -->
      <!-- <template #toolbar>
        <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam">
          <div class="custom-toolbar">
              
              <div class="filter-item status-select">
                <j-dict-select-tag v-model:value="queryParam.carStatus" dictCode="car_status" placeholder="车辆状态" @change="handleCarStatus"/>
              </div>
              
              <div class="filter-item status-select" style="margin-left: 10px;">
                <j-dict-select-tag v-model:value="queryParam.payStatus" dictCode="pay_status" placeholder="订单状态" @change="handlePayStatus"/>
              </div>

            <div class="actions" style="margin-left: 10px;">
              <a-button @click="searchReset">重置</a-button>
            </div>
          </div>
        </a-form>
      </template> -->

      <!--操作栏-->
      <!-- <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template> -->

    </BasicTable>
    <!-- 表单区域 -->
    <ParkingOrderModal ref="registerModal" @success="handleSuccess"></ParkingOrderModal>
  </div>
</template>

<script lang="ts" name="parking-parkingOrder" setup>
  import { ref, reactive, onMounted, watch } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, superQuerySchema } from './ParkingSettlementOrder.data';
  import {
    list,
    deleteOne,
    batchDelete,
    getImportUrl,
    getExportUrl,
    carEnterStatus,
    carLeaveStatus,
    cancelOrder,
    systemCompleteOrder,
  } from './ParkingSettlementOrder.api';
  import { queryComprehensiveStatistics, queryIncomeAndPayStatsBySettlementId } from '/@/views/parking/statistics/statistics.api';
  import ParkingOrderModal from '../components/ParkingOrderModal.vue';
  import OrderSettlementListStats from '../components/OrderSettlementListStats.vue';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { DatePicker } from 'ant-design-vue';

  const props = defineProps({
    parkingId: {
      type: String,
      default: '',
    },
    settlementId: {
      type: String,
      default: '',
    },
  });

  const formRef = ref();
  const queryParam = reactive<any>({});
  const registerModal = ref();

  // Stats Data
  const stats = reactive({
    totalOrders: 0,
    statusStats: [] as any[],
    orderAmount: '0.00',
    platformShare: '0.00',
    parkingSettlement: '0.00',
  });
  const activeDateType = ref('D1');

  //注册table数据
  const listPage = useListPage({
    tableProps: {
      title: '订单列表',
      api: list,
      columns,
      canResize: false,
      useSearchForm: false,
      showIndexColumn: true,
      showActionColumn: false,
      clickToRowSelect: false,
      tableSetting: {
        redo: false,
        size: false,
        setting: false,
        fullScreen: false,
      },
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        // Handle Date Range
        if (queryParam.createTimeRange && queryParam.createTimeRange.length === 2) {
            params.createTime_begin = queryParam.createTimeRange[0];
            params.createTime_end = queryParam.createTimeRange[1];
        }
        if (props.parkingId) {
          params.parkingId = props.parkingId;
        }
        if (props.settlementId) {
          params.settlementId = props.settlementId;
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
  const [registerTable, { reload }] = listPage.tableContext;

  // Fetch Stats
  async function fetchStats() {
    try {
      const params: any = {
        type: activeDateType.value,
        parkingId: props.parkingId
      };
      if (props.settlementId) {
        params.settlementId = props.settlementId;
      }
      
      // If settlementId is present, we might want to use a different API or the same API supports filtering by settlementId
      // Assuming queryComprehensiveStatistics supports settlementId based on previous context, 
      // but typically stats like 'income' might need the specific settlement stats API if the logic differs.
      // However, the prompt implies the LIST is filtered by settlementId. 
      // Let's check if we need to call queryIncomeAndPayStatsBySettlementId for the top stats as well?
      // The OrderListStats component handles its own data fetching via props or internal call?
      // OrderListStats fetches its own data internally using queryIncomeAndPayStats.
      // We updated OrderListStats to accept settlementId and use queryIncomeAndPayStatsBySettlementId.
      // So here we just need to fetch the order count/status stats.
      
      const res = await queryComprehensiveStatistics(params);
      if (res) {
        if (res.orderPayStatusStats) {
          stats.totalOrders = res.orderPayStatusStats.total || 0;
          if (res.orderPayStatusStats.list) {
             const colorMap = {
              '待支付': 'orange',
              '进行中': 'blue',
              '待付尾款': 'red',
              '已完成': 'green',
              '系统结单': 'cyan',
              '待退款': 'purple',
              '已取消': 'grey',
              '待完成': 'magenta',
              '已退款': 'grey',
            };
            stats.statusStats = res.orderPayStatusStats.list.map(item => ({
              label: item.name,
              value: item.count,
              color: colorMap[item.name] || 'grey'
            }));
          }
        }
        // Assuming these fields might be available or we map from what we have
        if (res.orderAmountRate) {
            stats.orderAmount = res.orderAmountRate.value?.toFixed(2) || '0.00';
        }
        // Placeholder for missing API fields
        // stats.platformShare = res.platformShare || '0.00';
        // stats.parkingSettlement = res.parkingSettlement || '0.00';
      }
    } catch (e) {
      console.error(e);
    }
  }

  function searchReset() {
    formRef.value.resetFields();
    queryParam.createTimeRange = undefined;
    queryParam.carStatus = undefined;
    queryParam.payStatus = undefined;
    //刷新数据
    reload();
  }
  function handleDateTypeChange(type: string) {
    activeDateType.value = type;
    fetchStats();
  }

  onMounted(() => {
    fetchStats();
  });

  watch(
    () => props.parkingId,
    () => {
      fetchStats();
      reload();
    }
  );
  
  watch(
    () => props.settlementId,
    () => {
      fetchStats();
      reload();
    }
  );

  /**
   * 新增事件
   */
  function handleAdd() {
    registerModal.value.disableSubmit = false;
    registerModal.value.add();
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

  async function cancelOrderHandle(record) {
    await cancelOrder({ orderId: record.id }, handleSuccess);
  }

  async function carEnterStatusHandle(record) {
    await carEnterStatus({ orderId: record.id }, handleSuccess);
  }

  async function carLeaveStatusHandle(record) {
    await carLeaveStatus({ orderId: record.id }, handleSuccess);
  }
  async function systemCompleteHandle(record) {
    await systemCompleteOrder({ orderId: record.id }, handleSuccess);
  }

  /**
   * 成功回调
   */
  function handleSuccess() {
    reload();
    fetchStats(); // Refresh stats too
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
   * 查询
   */
  function searchQuery() {
    reload();
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
        tooltip: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
        icon: 'ant-design:delete-outlined',
        auth: 'parking:order:delete'
      },
    ];
  }

  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [];
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
          justify-content: flex-end; /* Align filters to right */
          
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
    }
  }

  /* Override basic table default padding/margin if needed */
  :deep(.jeecg-basic-table-form-container) {
    padding: 0;
  }
</style>
