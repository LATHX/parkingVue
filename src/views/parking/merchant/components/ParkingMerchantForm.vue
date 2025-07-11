<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="ParkingMerchantForm">
          <a-row>
            <a-col :span="24">
              <a-form-item label="名称" v-bind="validateInfos.merchantName" id="ParkingMerchantForm-merchantName" name="merchantName">
                <a-input v-model:value="formData.merchantName" placeholder="请输入名称" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="手机号" v-bind="validateInfos.phone" id="ParkingMerchantForm-phone" name="phone">
                <a-input v-model:value="formData.phone" placeholder="请输入手机号" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="微信绑定openId" v-bind="validateInfos.openId" id="ParkingMerchantForm-openId" name="openId">
                <a-input v-model:value="formData.openId" placeholder="请输入微信绑定openId" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="微信绑定unionId" v-bind="validateInfos.unionId" id="ParkingMerchantForm-unionId" name="unionId">
                <a-input v-model:value="formData.unionId" placeholder="请输入微信绑定unionId" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="城市" v-bind="validateInfos.city" id="ParkingMerchantForm-city" name="city">
                <JSearchSelect v-model:value="formData.city" dictCode="city" placeholder="请输入城市" allow-clear />

              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="父账号" v-bind="validateInfos.parentId" id="ParkingMerchantForm-parentId" name="parentId">
                <j-search-select v-model:value="formData.parentId" dictCode="parking_merchant,phone,id" placeholder="请选择父账号" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="是否可用" v-bind="validateInfos.status" id="ParkingCustomerForm-status" name="status">
                <j-dict-select-tag v-model:value="formData.status" dictCode="yn" placeholder="请输入是否可用" allow-clear />
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
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../ParkingMerchant.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import JDictSelectTag from '../../../../components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { JSearchSelect } from '@/components/Form';

  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: () => ({}) },
    formBpm: { type: Boolean, default: true },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    phone: '',
    merchantName: '',
    openId: '',
    unionId: '',
    city: '',
    status: '',
    parentId: '',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    status: [{ required: true, message: '请输入是否可用!' }],
  });
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });

  // 表单禁用
  const disabled = computed(() => {
    if (props.formBpm === true) {
      if (props.formData.disabled === false) {
        return false;
      } else {
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
        if (record.hasOwnProperty(key)) {
          tmpData[key] = record[key];
        }
      });
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
    padding: 14px;
  }
</style>
