<template>
  <div class="p-2 parking-settlement-record-list">
    <!-- Top Stats -->
    <SettlementStats :parkingId="queryParam.parkingId" />

    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #toolbar>
        <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam">
          <div class="custom-toolbar">
            <div class="filters">
              <div class="search-input-wrapper">
                <j-dict-select-tag
                  v-model:value="queryParam.parkingId"
                  dictCode="parking_lot,parking_name,id"
                  placeholder="请输入车场名称检索"
                  class="search-input"
                  @change="handleParkingIdSelect"
                />
              </div>

              <div class="filter-item status-select">
                <j-dict-select-tag
                  v-model:value="queryParam.isSettlement"
                  dictCode="yn"
                  placeholder="结算状态"
                  @change="handleSettlementStatus"
                />
              </div>
            </div>

            <div class="actions">
              <!-- <a-button @click="onImportXls">导入</a-button> -->
              <a-button @click="onExportXls">导出</a-button>
              <!-- <a-button type="primary" @click="handleAdd">结算</a-button> -->
            </div>
          </div>
        </a-form>
      </template>

      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>

    </BasicTable>
    <!-- 表单区域 -->
    <ParkingSettlementRecordModal ref="registerModal" @success="handleSuccess"></ParkingSettlementRecordModal>
    <ParkingSettlementDetailModal ref="detailModal" @register="registerDetailModal"></ParkingSettlementDetailModal>
  </div>
</template>

<script lang="ts" name="parking-parkingSettlementRecord" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, superQuerySchema } from './ParkingSettlementRecord.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './ParkingSettlementRecord.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import ParkingSettlementRecordModal from './components/ParkingSettlementRecordModal.vue'
  import ParkingSettlementDetailModal from './components/ParkingSettlementDetailModal.vue'
  import { useUserStore } from '/@/store/modules/user';
  import SettlementStats from './components/SettlementStats.vue';
  import JSearchSelect from '/@/components/Form/src/jeecg/components/JSearchSelect.vue';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { useModal } from '/@/components/Modal';

  const formRef = ref();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const detailModal = ref();
  const userStore = useUserStore();
  //注册table数据
  const { tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '车场结算表',
      api: list,
      columns,
      canResize:false,
      useSearchForm: false,
      showIndexColumn: true,
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
        return Object.assign(params, queryParam);
      },
    },
    exportConfig: {
      name: "车场结算表",
      url: getExportUrl,
      params: queryParam,
    },
	  importConfig: {
	    url: getImportUrl,
	    success: handleSuccess
	  },
  });
  const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRowKeys }] = tableContext;

  const [registerDetailModal, { openModal: openDetailModal }] = useModal();

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
    openDetailModal(true, {
      record,
      isUpdate: true,
    });
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

  function handleParkingIdSelect(val) {
    queryParam.parkingId = val;
    searchQuery();
  }

  function handleSettlementStatus(val) {
    queryParam.isSettlement = val;
    searchQuery();
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
        tooltip: '编辑',
        onClick: handleEdit.bind(null, record),
        icon: 'ri:edit-line',
        auth: 'parking:parking_settlement_record:edit'
      },
      {
        tooltip: '删除',
        icon: 'material-symbols:delete',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
        auth: 'parking:parking_settlement_record:delete',
      },
    ];
  }
   
  /**
   * 下拉操作栏
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
    queryParam.isSettlement = undefined;
    //刷新数据
    reload();
  }
  




</script>

<style lang="less" scoped>
  .parking-settlement-record-list {
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
