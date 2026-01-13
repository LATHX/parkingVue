<template>
  <div class="p-2">
    <!--引用表格-->
    <BasicTable @register="registerTable">
      <!--插槽:table标题-->
      <template #tableTitle>
        <div class="custom-toolbar">
          <div class="page-title">发票申请</div>
        </div>
      </template>
      <template #toolbar>
        <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam">
          <div class="custom-toolbar">
            <div class="filters">
              <div class="search-input-wrapper">
                <j-search-select
                  v-model:value="queryParam.userId"
                  dict="parking_customer,phone,id"
                  placeholder="请输入申请用户手机号检索"
                  class="search-input"
                  @change="handleUserSelect"
                />
              </div>
              <div class="search-input-wrapper">
                <j-dict-select-tag
                  v-model:value="queryParam.type"
                  dictCode="invoice_type"
                  placeholder="抬头类型"
                  class="search-input"
                  @change="handleInvoiceTypeSelect"
                />
              </div>
              <div class="search-input-wrapper">
                <j-dict-select-tag
                  v-model:value="queryParam.status"
                  dictCode="invoice_status"
                  placeholder="开票状态"
                  class="search-input"
                  @change="handleInvoiceStatusSelect"
                />
              </div>
            </div>
            <div class="actions">
              <a-button @click="searchReset">重置</a-button>
              <j-upload-button type="default" v-auth="'invoice:business_invoice:importExcel'" @click="onImportXls">导入</j-upload-button>
              <a-button type="default" v-auth="'invoice:business_invoice:exportXls'" @click="onExportXls"> 导出</a-button>
              <a-button type="primary" v-auth="'invoice:business_invoice:add'" @click="handleAdd"> 新增</a-button>
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
    <BusinessInvoiceModal ref="registerModal" @success="handleSuccess"></BusinessInvoiceModal>
  </div>
</template>

<script lang="ts" name="invoice-businessInvoice" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, superQuerySchema } from './BusinessInvoice.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './BusinessInvoice.api';
  import BusinessInvoiceModal from './components/BusinessInvoiceModal.vue'
  import { useMessage } from '/@/hooks/web/useMessage';
  import {useModal} from '/@/components/Modal';
  import { getDateByPicker } from '/@/utils';
  import JSearchSelect from '/@/components/Form/src/jeecg/components/JSearchSelect.vue';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { SearchOutlined } from '@ant-design/icons-vue';

  const fieldPickers = reactive({
  });

  const formRef = ref();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const { createMessage } = useMessage();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '通用发票模块',
      api: list,
      columns,
      tableSetting: {
        redo: false,
        size: false,
        setting: false,
        fullScreen: false,
      },
      useSearchForm: false,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        for (let key in fieldPickers) {
          if (queryParam[key] && fieldPickers[key]) {
            queryParam[key] = getDateByPicker(queryParam[key], fieldPickers[key]);
          }
        }
        return Object.assign(params, queryParam);
      },
    },
    exportConfig: {
      name: "通用发票模块",
      url: getExportUrl,
      params: queryParam,
    },
	  importConfig: {
	    url: getImportUrl,
	    success: handleSuccess
	  },
  });
  const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRowKeys }] = tableContext;
  const labelCol = reactive({
    xs:24,
    sm:4,
    xl:6,
    xxl:4
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
   
  function handleUserSelect(val) {
    queryParam.userId = val;
    searchQuery();
  }

  function handleInvoiceTypeSelect(val) {
    queryParam.type = val;
    searchQuery();
  }

  function handleInvoiceStatusSelect(val) {
    queryParam.status = val;
    searchQuery();
  }

  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
        auth: 'invoice:business_invoice:edit'
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
      }, {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
        auth: 'invoice:business_invoice:delete'
      }
    ]
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
    queryParam.userId = undefined;
    queryParam.type = undefined;
    queryParam.status = undefined;
    //刷新数据
    reload();
  }
  





</script>

<style lang="less" scoped>
  /* Override basic table default padding/margin if needed */
  :deep(.jeecg-basic-table-form-container) {
    padding: 0;
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
</style>
