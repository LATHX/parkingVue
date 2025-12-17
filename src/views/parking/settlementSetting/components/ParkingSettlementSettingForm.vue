<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="ParkingSettlementSettingForm">
          <a-row>
            <a-col :span="24">
              <a-form-item label="停车场" v-bind="validateInfos.parkingId" id="ParkingSettlementSettingForm-parkingId" name="parkingId">
                <j-search-select v-model:value="formData.parkingId" dict="parking_lot,parking_name,id" allow-clear />
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item
                label="服务费率(百分%)"
                v-bind="validateInfos.serviceFeeRate"
                id="ParkingSettlementSettingForm-serviceFeeRate"
                name="serviceFeeRate"
              >
                <a-input-number
                  min="0"
                  max="100"
                  v-model:value="formData.serviceFeeRate"
                  placeholder="请输入服务费率,如果20%,则输入20"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="支付渠道费率(千分‰)"
                v-bind="validateInfos.payTypeRate"
                id="ParkingSettlementSettingForm-payTypeRate"
                name="payTypeRate"
              >
                <a-input-number
                  min="0"
                  max="100"
                  v-model:value="formData.payTypeRate"
                  placeholder="请输入支付渠道费率,如果3‰,则输入3"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="结算周期(日)"
                v-bind="validateInfos.settlementDay"
                id="ParkingSettlementSettingForm-settlementDay"
                name="settlementDay"
              >
                <a-input-number min="0" v-model:value="formData.settlementDay" placeholder="请输入结算周期(日)" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="结算周期"
                v-bind="validateInfos.settlementDay"
                id="ParkingSettlementSettingForm-settlementDay"
                name="settlementCycle"
              >
                <j-search-select v-model:value="formData.settlementCycle" dict="settlement_cycle" allow-clear />
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
  import { saveOrUpdate } from '../ParkingSettlementSetting.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import JSearchSelect from '../../../../components/Form/src/jeecg/components/JSearchSelect.vue';

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
    parkingId: '',
    serviceFeeRate: undefined,
    payTypeRate: undefined,
    settlementDay: 0,
    settlementCycle: undefined,
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({});
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
