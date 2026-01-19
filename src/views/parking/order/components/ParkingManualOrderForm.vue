<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="ParkingOrderForm">
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="关联车场" v-bind="validateInfos.parkingId" name="parkingId">
                 <j-search-select
                  v-model:value="formData.parkingId"
                  dict="parking_lot,parking_name,id,audit_status=1"
                  placeholder="请输入关联车场"
                  :disabled="disabled"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="手机号" name="userId" v-bind="validateInfos.userId">
                <!-- <j-dict-select-tag v-model:value="formData.userId" dictCode="parking_customer,phone,id" placeholder="请选择用户" :disabled="disabled" /> -->
               <a-input v-model:value="formData.userId" placeholder="请输入手机号" :disabled="disabled" />
              
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="车位类型" name="parkingType" v-bind="validateInfos.parkingType">
                <j-dict-select-tag v-model:value="formData.parkingType" dictCode="parking_type" placeholder="请选择车位类型" :disabled="disabled" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="车牌号" name="carPlate" v-bind="validateInfos.carPlate">
                <a-input v-model:value="formData.carPlate" placeholder="请输入车牌号" :disabled="disabled" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="出行人数" name="peopleCount" v-bind="validateInfos.peopleCount">
                <a-input v-model:value="formData.peopleCount" placeholder="请输入出行人数" :disabled="disabled" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="预计进场时间" name="predictStartDate" v-bind="validateInfos.predictStartDate">
                <a-date-picker
                  v-model:value="formData.predictStartDate"
                  showTime
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                  :disabled="disabled"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="预计离场时间" v-bind="validateInfos.predictEndDate" name="predictEndDate">
                <a-date-picker
                  v-model:value="formData.predictEndDate"
                  showTime
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                  :disabled="disabled"
                />
              </a-form-item>
            </a-col>
             <a-col :span="12">
              <a-form-item label="备注" name="remark">
                <a-textarea v-model:value="formData.remark" :rows="4" placeholder="请输入备注" :disabled="disabled" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </template>
    </JFormContainer>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, nextTick, computed } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getValueType } from '/@/utils';
  import { saveOrUpdateManualOrder } from '../ParkingOrder.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import JDictSelectTag from '../../../../components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JSearchSelect from '/@/components/Form/src/jeecg/components/JSearchSelect.vue';
  import dayjs from 'dayjs';

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
    userId: '',
    parkingId: undefined,
    parkingType: '',
    predictStartDate: '',
    predictEndDate: '',
    carPlate: '',
    peopleCount: undefined,
    remark: '',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
 const validatorRules = reactive({
    parkingId: [{ required: true, message: '请选择关联车场', trigger: 'change' }],
    userId: [{ required: true, message: '请选择用户', trigger: 'change' }],
    parkingType: [{ required: true, message: '请选择车位类型', trigger: 'change' }],
    carPlate: [{ required: true, message: '请输入车牌号', trigger: 'blur' }],
    peopleCount: [{ required: true, message: '请输入出行人数', trigger: 'blur' }],
    predictStartDate: [{ required: true, message: '请选择预计进场时间', trigger: 'change' }],
    predictEndDate: [{ required: true, message: '请选择预计离场时间', trigger: 'change' }],
  });
  const { resetFields, validate,validateInfos } = useForm(formData, validatorRules, { immediate: false });

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
  function edit(record: any) {
    nextTick(() => {
      resetFields();
      const tmpData = {};
      Object.keys(formData).forEach((key) => {
        if (record.hasOwnProperty(key)) {
          tmpData[key] = record[key];
        }
      });
      // 赋值
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
    } catch (e: any) {
      const errorFields = e?.errorFields;
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
    await saveOrUpdateManualOrder(model, isUpdate.value)
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
    
    .section-header {
      margin-bottom: 24px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      
      .section-title {
        font-size: 16px;
        font-weight: bold;
        color: #333;
        border-left: 4px solid #1890ff;
        padding-left: 10px;
        line-height: 1;
      }
    }
  }
</style>
