<template>
  <div class="p-2 parking-merchant-list">
    <!--引用表格-->
    <BasicTable @register="registerTable" >
      <!--插槽:table标题-->
      <template #toolbar>
        <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam">
          <div class="custom-toolbar">
            <div class="filters">
              <div class="search-input-wrapper">
                <a-input v-model:value="queryParam.merchantName" placeholder="请输入商户名称检索" class="search-input" />
              </div>
              <div class="search-input-wrapper">
                 <j-search-select
                   v-model:value="queryParam.city" 
                   dict="city" 
                   placeholder="请输入城市名称检索" 
                   class="search-input" 
                   @change="handleCitySelect" 
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
    <ParkingMerchantModal ref="registerModal" @success="handleSuccess" />
    <ParkingLotMerchantModal @register="registerParkingLotModal" />
  </div>
</template>

<script lang="ts" name="parking-parkingMerchant" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, superQuerySchema } from './ParkingMerchant.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './ParkingMerchant.api';
  import ParkingMerchantModal from './components/ParkingMerchantModal.vue';
  import ParkingLotMerchantModal from './components/ParkingLotMerchantModal.vue';
  import JSearchSelect from '/@/components/Form/src/jeecg/components/JSearchSelect.vue';
  import { useModal } from '/@/components/Modal';

  const formRef = ref();
  const queryParam = reactive<any>({});
  const registerModal = ref();
  const [registerParkingLotModal, { openModal: openParkingLotModal }] = useModal();
  //注册table数据
  const { tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '停车场商户',
      api: list,
      columns,
      canResize: false,
      useSearchForm: false,
      showIndexColumn: true,
      rowSelection: { type: 'radio' },
      tableSetting: {
        redo: false,
        size: false,
        setting: false,
        fullScreen: false,
      },
      actionColumn: {
        width: 240,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        return Object.assign(params, queryParam);
      },
    },
    exportConfig: {
      name: '停车场商户',
      url: getExportUrl,
      params: queryParam,
    },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess,
    },
  });
  const [
    registerTable,
    { reload },
    { rowSelection, selectedRowKeys },
  ] = tableContext;

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

  function handleVisibleParkingLotList(record: Recordable) {
    openParkingLotModal(true, { merchantId: record.id });
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

  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }
  
  function handleCitySelect(val) {
    queryParam.city = val;
    searchQuery();
  }

  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        tooltip: '编辑',
        onClick: handleEdit.bind(null, record),
        icon: 'ri:edit-line',
        auth: 'parking:parking_merchant:edit',
      },
      {
        title: '显示关联车场',
        onClick: handleVisibleParkingLotList.bind(null, record),
        icon: 'ant-design:link-outlined',
      },
      {
        tooltip: '删除',
        icon: 'material-symbols:delete',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
        auth: 'parking:parking_merchant:delete',
      },
    ];
  }

  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
    ];
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
    queryParam.merchantName = undefined;
    queryParam.city = undefined;
    //刷新数据
    reload();
  }
</script>

<style lang="less" scoped>
  .parking-merchant-list {
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
