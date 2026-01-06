<template>
  <div class="p-2 parking-price-list">
    <!--引用表格-->
    <BasicTable @register="registerTable">
      <!--插槽:table标题-->
      <template #tableTitle>
        <div class="custom-toolbar">
          <div class="page-title">价格审核</div>
        </div>
      </template>

      <!-- Custom Toolbar -->
      <template #toolbar>
        <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam">
          <div class="custom-toolbar">
            <div class="filters">
              <div class="search-input-wrapper">
                <j-search-select
                  v-model:value="queryParam.parkingId"
                  dict="parking_lot,parking_name,id"
                  placeholder="请输入车场名称检索"
                  class="search-input"
                  @change="handleParkingIdSelect"
                />
              </div>
            </div>
            <div class="actions">
              <a-button @click="searchReset">重置</a-button>
              <!-- <a-button @click="onImportXls">导入</a-button> -->
              <!-- <a-button @click="onExportXls">导出</a-button> -->
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
    <ParkingPriceModal ref="registerModal" @success="handleSuccess"></ParkingPriceModal>
  </div>
</template>

<script lang="ts" name="parking-parkingPrice" setup>
import { ref, reactive, watch } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, superQuerySchema } from './ParkingPriceAudit.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './ParkingPrice.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import ParkingPriceModal from './components/ParkingPriceModal.vue';
  import { useUserStore } from '/@/store/modules/user';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JSelectMultiple from '/@/components/Form/src/jeecg/components/JSelectMultiple.vue';
  import JSearchSelect from '/@/components/Form/src/jeecg/components/JSearchSelect.vue';
  import { TimePicker } from 'ant-design-vue';
  import { audit } from '@/views/parking/price/ParkingPrice.api';

  const formRef = ref();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const userStore = useUserStore();

  const props = defineProps({
    parkingId: {
      type: String,
      default: null,
    },
  });
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '停车场价格表',
      api: list,
      columns,
      canResize: false,
      useSearchForm: false,
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
        return Object.assign(params, queryParam, { auditStatus: '0' });
      },
    },
    exportConfig: {
      name: '停车场价格表',
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
  watch(
    () => props.parkingId,
    (newVal) => {
      reload();
      // 在这里处理变化后的逻辑
    },
    // 可选配置： immediate 表示是否在初始时立即执行一次
    { immediate: true }
  );
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

  async function handleAudit(id, auditStatus) {
    await audit({ id: id, auditStatus: auditStatus }, handleSuccess);
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

  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        tooltip: '查看',
        onClick: handleDetail.bind(null, record),
        icon: 'mdi:eye',
      },
      {
        tooltip: '编辑',
        onClick: handleEdit.bind(null, record),
        icon: 'ri:edit-line',
        auth: 'parking:parking_price:edit',
      },
      {
        tooltip: '删除',
        icon: 'material-symbols:delete',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
        auth: 'parking:parking_price:delete',
      },
    ];
  }

  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '审核通过',
        popConfirm: {
          title: '是否确认审核通过',
          confirm: handleAudit.bind(null, record.id, 1),
          placement: 'topLeft',
        },
      },
      {
        label: '审核不通过',
        popConfirm: {
          title: '是否确认审核不通过',
          confirm: handleAudit.bind(null, record.id, 2),
          placement: 'topLeft',
        },
      },
    ];
  }

  /**
   * 查询
   */
  function searchQuery() {
    reload();
  }

  function handleParkingIdSelect(val) {
    queryParam.parkingId = val;
    searchQuery();
  }

  /**
   * 重置
   */
  function searchReset() {
    formRef.value.resetFields();
    selectedRowKeys.value = [];
    //刷新数据
    reload();
    queryParam.parkingId = '';
  }
</script>

<style lang="less" scoped>
  .parking-price-list {
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
