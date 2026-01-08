<template>
  <div class="p-2 parking-customer-list">
    <!--引用表格-->
    <BasicTable @register="registerTable" >
      <!--插槽:table标题-->
      <template #toolbar>
        <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam">
          <div class="custom-toolbar">
            <div class="filters">
              <div class="search-input-wrapper">
                <a-input v-model:value="queryParam.phone" placeholder="请输入手机号检索" class="search-input" />
              </div>
              <!-- <div class="filter-item">
                <a-range-picker v-model:value="queryParam.createTimeRange" value-format="YYYY-MM-DD" />
              </div> -->
              <!-- <div class="filter-item status-select">
                <j-dict-select-tag v-model:value="queryParam.customerStatus" dictCode="customer_status" placeholder="顾客状态" @change="handleCustomerStatus"/>
              </div> -->
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
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>

    </BasicTable>
    <!-- 表单区域 -->
    <ParkingCustomerModal ref="registerModal" @success="handleSuccess"></ParkingCustomerModal>
  </div>
</template>

<script lang="ts" name="parking-parkingCustomer" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, superQuerySchema } from './ParkingCustomer.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './ParkingCustomer.api';

  import ParkingCustomerModal from './components/ParkingCustomerModal.vue'

  
  const formRef = ref();
  const queryParam = reactive<any>({});
  const registerModal = ref();
  //注册table数据
  const { tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '停车场客户',
      api: list,
      columns,
      canResize:false,
      useSearchForm: false,
      tableSetting: {
        redo: false,
        size: false,
        setting: false,
        fullScreen: false,
      },
      showIndexColumn: true,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        return Object.assign(params, queryParam);
      },
    },
    exportConfig: {
      name: "停车场客户",
      url: getExportUrl,
      params: queryParam,
    },
	  importConfig: {
	    url: getImportUrl,
	    success: handleSuccess
	  },
  });
  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;
  
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
        tooltip: '详情',
        onClick: handleDetail.bind(null, record),
        icon: 'mdi:eye',
      },
      {
        tooltip: '编辑',
        onClick: handleEdit.bind(null, record),
        icon: 'ri:edit-line',
        auth: 'parking:parking_customer:edit'
      },
      {
        tooltip: '删除',
        icon: 'material-symbols:delete',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
        auth: 'parking:parking_customer:delete',
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
    queryParam.phone = undefined;
    //刷新数据
    reload();
  }
  




</script>

<style lang="less" scoped>
  .parking-customer-list {
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
