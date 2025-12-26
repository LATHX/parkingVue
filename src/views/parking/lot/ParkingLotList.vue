<template>
  <div class="p-2 parking-lot-list">
    <!-- Top Stats -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="icon-wrapper">
          <img :src="iconParkingLeft" alt="车场总数" />
        </div>
        <div class="content">
          <div class="label">车场总数</div>
          <div class="value blue-text">{{ totalParkingAnim.toFixed(0) }}</div>
        </div>
        <img class="chart-line" :src="bgParkingRight" alt="车场总数" />
      </div>

      <div class="stat-card">
        <div class="icon-wrapper">
          <img :src="iconAirportLeft" alt="机场类型" />
        </div>
        <div class="content">
          <div class="label">机场类型</div>
          <div class="value orange-text">{{ airportAnim.toFixed(0) }}</div>
        </div>
            <img class="chart-line" :src="bgAirportRight" alt="车场总数" />
      </div>

      <div class="stat-card">
        <div class="icon-wrapper">
          <img :src="iconTrainLeft" alt="高铁站类型" />
        </div>
        <div class="content">
          <div class="label">高铁站类型</div>
          <div class="value green-text">{{ trainAnim.toFixed(0) }}</div>
        </div>
            <img class="chart-line" :src="bgTrainRight" alt="车场总数" />
      </div>

      <div class="stat-card">
        <div class="icon-wrapper">
          <img :src="iconNewLeft" alt="今日新增" />
        </div>
        <div class="content">
          <div class="label">今日新增</div>
          <div class="value red-text">{{ todayNewAnim.toFixed(0) }}</div>
        </div>
            <img class="chart-line" :src="bgNewRight" alt="车场总数" />
      </div>
    </div>

    <!--引用表格-->
    <BasicTable @register="registerTable">
      <!--插槽:table标题-->
      <template #tableTitle>
        <div class="custom-toolbar">
          <div class="page-title">入驻车场</div>
        </div>
      </template>
      <!-- Remove default toolbar -->
      <template #toolbar>
        <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam">
          <div class="custom-toolbar">
            <div style="width: 200px; margin-right: 10px">
              <a-input v-model:value="queryParam.parkingName" placeholder="请输入停车场名称搜索" class="search-input" @pressEnter="searchQuery">
                <template #prefix><SearchOutlined /></template>
              </a-input>
            </div>
            <div class="actions">
              <j-search-select v-model:value="queryParam.city" dict="city" placeholder="所属区域" class="filter-item" @change="handleCitySelect" />
              <j-search-select
                v-model:value="queryParam.locationType"
                dict="locationType"
                placeholder="车场类型"
                class="filter-item"
                @change="handleLocationTypeSelect"
              />
              <a-button @click="searchReset">清空</a-button>
              <!--            <a-button @click="onImportXls">导入</a-button>-->
              <a-button @click="onExportXls">导出</a-button>
              <a-button type="primary" @click="handleAdd">新增</a-button>
            </div></div
          ></a-form
        >
      </template>

      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
      <template v-slot:bodyCell="{ column, record, index, text }"></template>
    </BasicTable>
    <!-- 表单区域 -->
    <ParkingLotModal ref="registerModal" @success="handleSuccess"></ParkingLotModal>
    <ParkingLotTabsModal ref="parkingLotTabsModal" @success="handleSuccess"></ParkingLotTabsModal>
  </div>
</template>

<script lang="ts" name="parking-parkingLot" setup>
  import { ref, reactive, watch, watchEffect, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useTransition, TransitionPresets } from '@vueuse/core';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, superQuerySchema } from './ParkingLot.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl, audit } from './ParkingLot.api';
  import { queryDataStatistics, queryLocationTypeStatistics } from '/@/views/parking/statistics/statistics.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import ParkingLotModal from './components/ParkingLotModal.vue';
  import ParkingLotTabsModal from './components/ParkingLotTabsModal.vue';
  import { useUserStore } from '/@/store/modules/user';
  import JInput from '/@/components/Form/src/jeecg/components/JInput.vue';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';

  // Left Icons
  import iconParkingLeft from '/@/assets/customerize/lot/车场总数左.png';
  import iconAirportLeft from '/@/assets/customerize/lot/机场类型左.png';
  import iconTrainLeft from '/@/assets/customerize/lot/高铁站类型左.png';
  import iconNewLeft from '/@/assets/customerize/lot/今日新增左.png';

  // Right Backgrounds
  import bgParkingRight from '/@/assets/customerize/lot/车场总数右.png';
  import bgAirportRight from '/@/assets/customerize/lot/机场类型右.png';
  import bgTrainRight from '/@/assets/customerize/lot/高铁站类型右.png';
  import bgNewRight from '/@/assets/customerize/lot/今日新增右.png';

  import { JSearchSelect } from '@/components/Form';

  const route = useRoute();
  const formRef = ref();
  const queryParam = reactive<any>({
    parkingName: undefined,
    locationType: undefined,
    city: undefined,
  });
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const parkingLotTabsModal = ref();
  const userStore = useUserStore();
  let customQueryParam = reactive<any>({});
  const props = defineProps({
    merchantId: {
      type: String,
      default: null,
    },
  });

  // Stats Logic
  const stats = ref({
    totalParking: 0,
    airport: 0,
    train: 0,
    todayNew: 0,
  });

  const duration = 1500;
  const transition = TransitionPresets.easeOutExpo;
  const totalParkingAnim = useTransition(() => stats.value.totalParking, { duration, transition });
  const airportAnim = useTransition(() => stats.value.airport, { duration, transition });
  const trainAnim = useTransition(() => stats.value.train, { duration, transition });
  const todayNewAnim = useTransition(() => stats.value.todayNew, { duration, transition });

  onMounted(async () => {
    try {
      const locStats = await queryLocationTypeStatistics();

      // Process locStats
      if (locStats) {
        stats.value.totalParking = Number(locStats.total) || 0;
        stats.value.todayNew = Number(locStats.todayAdd) || 0;
        if (locStats.list) {
          const air = locStats.list.find((i: any) => i.type === 'flight');
          const tr = locStats.list.find((i: any) => i.type === 'train');
          stats.value.airport = Number(air?.value) || 0;
          stats.value.train = Number(tr?.value) || 0;
        }
      }
    } catch (e) {
      console.error(e);
    }
  });

  watchEffect(() => {
    Object.assign(customQueryParam, {});
    Object.assign(customQueryParam, {
      merchantId: props.merchantId,
      auditStatus: route.query.auditStatus === undefined ? null : route.query.auditStatus,
    });
  });
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '停车场场地',
      api: list,
      columns,
      canResize: false,
      bordered: false,
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
        width: 220,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        return Object.assign(params, queryParam, customQueryParam);
      },
    },
    exportConfig: {
      name: '停车场场地',
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
    registerModal.value.disableSubmit = false;
    registerModal.value.add();
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

  function handleShowInfo(record: Recordable) {
    parkingLotTabsModal.value.disableSubmit = true;
    parkingLotTabsModal.value.edit(record);
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

  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }

  function handleOther(showType, record: Recordable) {
    registerModal.value.parkingId = record.id;
    registerModal.value.disableSubmit = false;
    registerModal.value.showOther(showType);
  }

  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        tooltip: '查看',
        onClick: handleShowInfo.bind(null, record),
        icon: 'mdi:eye',
      },
      {
        tooltip: '编辑',
        onClick: handleEdit.bind(null, record),
        icon: 'ri:edit-line',
        auth: 'parking:parking_lot:edit',
      },
      {
        tooltip: '删除',
        icon: 'material-symbols:delete',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
        auth: 'parking:parking_lot:delete',
      },
      {
        tooltip: '订单',
        onClick: handleEdit.bind(null, record),
        icon: 'lsicon:order-filled',
      },
      {
        tooltip: '车场评价',
        onClick: handleEdit.bind(null, record),
        icon: 'material-symbols:comment',
      },
    ];
  }

  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [];
  }

  async function handleAudit(id, auditStatus) {
    await audit({ id: id, auditStatus: auditStatus }, handleSuccess);
  }

  /**
   * 查询
   */
  function searchQuery() {
    reload({ page: 1 });
  }

  function handleCitySelect(text) {
    queryParam.city = text;
    searchQuery();
  }

  function handleLocationTypeSelect(text) {
    queryParam.locationType = text;
    searchQuery();
  }

  /**
   * 重置
   */
  function searchReset() {
    formRef.value.resetFields();
    selectedRowKeys.value = [];
    queryParam.city = undefined;
    queryParam.locationType = undefined;
    queryParam.parkingName = undefined;
    //刷新数据
    reload();
  }
</script>

<style lang="less" scoped>
  .parking-lot-list {
    .stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 16px;

      .stat-card {
        background: white;
        padding: 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        height: 100px;

        .icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          z-index: 2;

          img {
            width: 40px;
            height: 40px;
          }

          &.blue-bg {
            background: rgba(24, 144, 255, 0.1);
          }
          &.orange-bg {
            background: rgba(250, 140, 22, 0.1);
          }
          &.green-bg {
            background: rgba(82, 196, 26, 0.1);
          }
          &.red-bg {
            background: rgba(245, 34, 45, 0.1);
          }
        }

        .content {
          z-index: 2;
          .label {
            font-size: 14px;
            color: #666;
            margin-bottom: 4px;
          }
          .value {
            font-size: 24px;
            font-weight: bold;

            &.blue-text {
              color: #1890ff;
            }
            &.orange-text {
              color: #fa8c16;
            }
            &.green-text {
              color: #52c41a;
            }
            &.red-text {
              color: #f5222d;
            }
          }
        }
        .chart-line {
          position: absolute;
          right: 0;
          bottom: 0;
          height: 80px;
          width: 248px;
          object-fit: fill;
          z-index: 1;
        }
      }
    }

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

      .actions {
        display: flex;
        gap: 10px;
        align-items: center;

        .search-input {
          width: 260px !important;
          border-radius: 4px;
        }

        .filter-item {
          width: 120px;
        }
      }
    }
  }

  /* Override basic table default padding/margin if needed */
  :deep(.jeecg-basic-table-form-container) {
    padding: 0;
  }
</style>
