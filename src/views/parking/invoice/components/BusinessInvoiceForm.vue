<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="BusinessInvoiceForm">
          <a-row>
						<a-col :span="24">
							<a-form-item label="发票类型(0个人,1企业)" v-bind="validateInfos.type" id="BusinessInvoiceForm-type" name="type">
								<a-input v-model:value="formData.type" placeholder="请输入发票类型(0个人,1企业)"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="发票抬头" v-bind="validateInfos.title" id="BusinessInvoiceForm-title" name="title">
								<a-input v-model:value="formData.title" placeholder="请输入发票抬头"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="发票税号" v-bind="validateInfos.tax" id="BusinessInvoiceForm-tax" name="tax">
								<a-input v-model:value="formData.tax" placeholder="请输入发票税号"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="地址" v-bind="validateInfos.address" id="BusinessInvoiceForm-address" name="address">
								<a-input v-model:value="formData.address" placeholder="请输入地址"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="手机号" v-bind="validateInfos.phone" id="BusinessInvoiceForm-phone" name="phone">
								<a-input v-model:value="formData.phone" placeholder="请输入手机号"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="银行名" v-bind="validateInfos.bankName" id="BusinessInvoiceForm-bankName" name="bankName">
								<a-input v-model:value="formData.bankName" placeholder="请输入银行名"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="银行帐号" v-bind="validateInfos.bankAccount" id="BusinessInvoiceForm-bankAccount" name="bankAccount">
								<a-input v-model:value="formData.bankAccount" placeholder="请输入银行帐号"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="订单号" v-bind="validateInfos.orderId" id="BusinessInvoiceForm-orderId" name="orderId">
								<a-input v-model:value="formData.orderId" placeholder="请输入订单号"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="发票金额" v-bind="validateInfos.invoicePrice" id="BusinessInvoiceForm-invoicePrice" name="invoicePrice">
								<a-input-number v-model:value="formData.invoicePrice" placeholder="请输入发票金额" style="width: 100%" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="发票状态" v-bind="validateInfos.status" id="BusinessInvoiceForm-status" name="status">
								<a-input v-model:value="formData.status" placeholder="请输入发票状态"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="收票邮箱" v-bind="validateInfos.mail" id="BusinessInvoiceForm-mail" name="mail">
								<a-input v-model:value="formData.mail" placeholder="请输入收票邮箱"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="备注" v-bind="validateInfos.remark" id="BusinessInvoiceForm-remark" name="remark">
								<a-textarea v-model:value="formData.remark" :rows="4" placeholder="请输入备注" />
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="重发状态 0否1是" v-bind="validateInfos.resendStatus" id="BusinessInvoiceForm-resendStatus" name="resendStatus">
								<a-input v-model:value="formData.resendStatus" placeholder="请输入重发状态 0否1是"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="发票处理方" v-bind="validateInfos.invoiceSource" id="BusinessInvoiceForm-invoiceSource" name="invoiceSource">
								<a-input v-model:value="formData.invoiceSource" placeholder="请输入发票处理方"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="订单来源" v-bind="validateInfos.orderSource" id="BusinessInvoiceForm-orderSource" name="orderSource">
								<a-input v-model:value="formData.orderSource" placeholder="请输入订单来源"  allow-clear ></a-input>
							</a-form-item>
						</a-col>
          </a-row>
        </a-form>
      </template>
    </JFormContainer>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getDateByPicker, getValueType } from '/@/utils';
  import { saveOrUpdate } from '../BusinessInvoice.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: () => ({})},
    formBpm: { type: Boolean, default: true }
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    type: '',   
    title: '',   
    tax: '',   
    address: '',   
    phone: '',   
    bankName: '',   
    bankAccount: '',   
    orderId: '',   
    invoicePrice: undefined,
    status: '',   
    mail: '',   
    remark: '',   
    resendStatus: '',   
    invoiceSource: '',   
    orderSource: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    type: [{ required: true, message: '请输入发票类型(0个人,1企业)!'},],
    invoicePrice: [{ required: true, message: '请输入发票金额!'},],
    resendStatus: [{ required: true, message: '请输入重发状态 0否1是!'},],
  });
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });
  //日期个性化选择
  const fieldPickers = reactive({
  });

  // 表单禁用
  const disabled = computed(()=>{
    if(props.formBpm === true){
      if(props.formData.disabled === false){
        return false;
      }else{
        return true;
      }
    }
    return props.formDisabled;
  });

  
  /**
   * 新增
   */
  function add() {
    edit({});
  }

  /**
   * 编辑
   */
  function edit(record) {
    nextTick(() => {
      resetFields();
      const tmpData = {};
      Object.keys(formData).forEach((key) => {
        if(record.hasOwnProperty(key)){
          tmpData[key] = record[key]
        }
      })
      //赋值
      Object.assign(formData, tmpData);
    });
  }

  /**
   * 提交数据
   */
  async function submitForm() {
    try {
      // 触发表单验证
      await validate();
    } catch ({ errorFields }) {
      if (errorFields) {
        const firstField = errorFields[0];
        if (firstField) {
          formRef.value.scrollToField(firstField.name, { behavior: 'smooth', block: 'center' });
        }
      }
      return Promise.reject(errorFields);
    }
    confirmLoading.value = true;
    const isUpdate = ref<boolean>(false);
    //时间格式化
    let model = formData;
    if (model.id) {
      isUpdate.value = true;
    }
    //循环数据
    for (let data in model) {
      // 更新个性化日期选择器的值
      model[data] = getDateByPicker(model[data], fieldPickers[data]);
      //如果该数据是数组并且是字符串类型
      if (model[data] instanceof Array) {
        let valueType = getValueType(formRef.value.getProps, data);
        //如果是字符串类型的需要变成以逗号分割的字符串
        if (valueType === 'string') {
          model[data] = model[data].join(',');
        }
      }
    }
    await saveOrUpdate(model, isUpdate.value)
      .then((res) => {
        if (res.success) {
          createMessage.success(res.message);
          emit('ok');
        } else {
          createMessage.warning(res.message);
        }
      })
      .finally(() => {
        confirmLoading.value = false;
      });
  }


  defineExpose({
    add,
    edit,
    submitForm,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    padding: 14px 20px;
  }
</style>
