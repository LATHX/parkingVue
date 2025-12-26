<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="ParkingPriceForm">
          <div class="section-header">
            <span class="bar">|</span>
            <span class="title">车位价格表</span>
          </div>
          <a-row :gutter="24">
            <a-col :span="24" v-show="false">
              <a-form-item label="停车场名" v-bind="validateInfos.parkingId" id="ParkingPriceForm-parkingId" name="parkingId">
                <j-search-select v-model:value="formData.parkingId" dict="parking_lot,parking_name,id" allow-clear />
              </a-form-item>
            </a-col>
            
            <a-col :span="12">
              <a-form-item label="车位类型" v-bind="validateInfos.parkingType" id="ParkingPriceForm-parkingType" name="parkingType">
                <j-dict-select-tag v-model:value="formData.parkingType" dictCode="parking_type" placeholder="请选择车位类型" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="总库存" v-bind="validateInfos.stockTotal" id="ParkingPriceForm-stockTotal" name="stockTotal">
                <a-input-number v-model:value="formData.stockTotal" placeholder="请输入总库存" style="width: 100%" />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="库存" v-bind="validateInfos.stock" id="ParkingPriceForm-stock" name="stock">
                <a-input-number v-model:value="formData.stock" placeholder="请输入库存" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="第一天总价" v-bind="validateInfos.parkingPriceSum1" id="ParkingPriceForm-parkingPriceSum1" name="parkingPriceSum1">
                <a-input-number v-model:value="formData.parkingPriceSum1" placeholder="请输入第一天总价" style="width: 100%" />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="第二天总价" v-bind="validateInfos.parkingPriceSum2" id="ParkingPriceForm-parkingPriceSum2" name="parkingPriceSum2">
                <a-input-number v-model:value="formData.parkingPriceSum2" placeholder="请输入第二天总价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="第三天总价" v-bind="validateInfos.parkingPriceSum3" id="ParkingPriceForm-parkingPriceSum3" name="parkingPriceSum3">
                <a-input-number v-model:value="formData.parkingPriceSum3" placeholder="请输入第三天总价" style="width: 100%" />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="第四天总价" v-bind="validateInfos.parkingPriceSum4" id="ParkingPriceForm-parkingPriceSum4" name="parkingPriceSum4">
                <a-input-number v-model:value="formData.parkingPriceSum4" placeholder="请输入第四天总价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="第五天总价" v-bind="validateInfos.parkingPriceSum5" id="ParkingPriceForm-parkingPriceSum5" name="parkingPriceSum5">
                <a-input-number v-model:value="formData.parkingPriceSum5" placeholder="请输入第五天总价" style="width: 100%" />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="第六天总价" v-bind="validateInfos.parkingPriceSum6" id="ParkingPriceForm-parkingPriceSum6" name="parkingPriceSum6">
                <a-input-number v-model:value="formData.parkingPriceSum6" placeholder="请输入第六天总价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="第七天总价" v-bind="validateInfos.parkingPriceSum7" id="ParkingPriceForm-parkingPriceSum7" name="parkingPriceSum7">
                <a-input-number v-model:value="formData.parkingPriceSum7" placeholder="请输入第七天总价" style="width: 100%" />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="在X天后" v-bind="validateInfos.afterDay" id="ParkingPriceForm-afterDay" name="afterDay" required>
                <a-input-number v-model:value="formData.afterDay" placeholder="请输入在X天后" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                required
                label="在X天后每天价格"
                v-bind="validateInfos.afterDailyPrice"
                id="ParkingPriceForm-afterDailyPrice"
                name="afterDailyPrice"
              >
                <a-input-number v-model:value="formData.afterDailyPrice" placeholder="请输入在X天后每天价格" style="width: 100%" />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="调价类型" v-bind="validateInfos.adjustPriceType" id="ParkingPriceForm-adjustPriceType" name="adjustPriceType">
                <j-dict-select-tag v-model:value="formData.adjustPriceType" dictCode="adjust_price_type" placeholder="请选择调价类型" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="调整价格" v-bind="validateInfos.adjustPrice" id="ParkingPriceForm-adjustPrice" name="adjustPrice">
                <a-input-number v-model:value="formData.adjustPrice" placeholder="请输入调整价格" style="width: 100%" />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="调价开始日" v-bind="validateInfos.adjustStartDate" id="ParkingPriceForm-adjustStartDate" name="adjustStartDate">
                <a-date-picker
                  placeholder="请选择调价开始日"
                  v-model:value="formData.adjustStartDate"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="调价结束日" v-bind="validateInfos.adjustEndDate" id="ParkingPriceForm-adjustEndDate" name="adjustEndDate">
                <a-date-picker
                  placeholder="请选择调价结束日"
                  v-model:value="formData.adjustEndDate"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>

            <a-col :span="24" :hidden="true">
              <a-form-item label="营业时间类型" v-bind="validateInfos.businessType" id="ParkingPriceForm-businessType" name="businessType">
                <j-dict-select-tag v-model:value="formData.businessTimeType" dictCode="business_time_type" placeholder="请选择营业类型" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24" :hidden="true">
              <a-form-item
                label="开始营业时间"
                v-bind="validateInfos.businessStartTime"
                id="ParkingPriceForm-businessStartTime"
                name="businessStartTime"
              >
                <time-picker
                  placeholder="请选择开始营业时间"
                  value-format="HH:mm:ss"
                  v-model:value="formData.businessStartTime"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24" :hidden="true">
              <a-form-item label="结束营业时间" v-bind="validateInfos.businessEndTime" id="ParkingPriceForm-businessEndTime" name="businessEndTime">
                <time-picker
                  placeholder="请选择结束营业时间"
                  value-format="HH:mm:ss"
                  v-model:value="formData.businessEndTime"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="营业状态" v-bind="validateInfos.businessStatus" id="ParkingPriceForm-businessStatus" name="businessStatus">
                <j-dict-select-tag v-model:value="formData.businessStatus" dictCode="business_status" placeholder="请选择营业状态" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="审核状态" v-bind="validateInfos.auditStatus" id="ParkingPriceForm-auditStatus" name="auditStatus">
                <j-dict-select-tag v-model:value="formData.auditStatus" dictCode="audit_status" placeholder="请选择审核状态" allow-clear />
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
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JSearchSelect from '/@/components/Form/src/jeecg/components/JSearchSelect.vue';
  import { TimePicker } from 'ant-design-vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../ParkingPrice.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import { JAreaLinkage } from '@/components/Form';

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
    parkingType: '',
    stock: '',
    stockTotal: '',
    parkingPriceSum1: undefined,
    parkingPriceSum2: undefined,
    parkingPriceSum3: undefined,
    parkingPriceSum4: undefined,
    parkingPriceSum5: undefined,
    parkingPriceSum6: undefined,
    parkingPriceSum7: undefined,
    afterDay: undefined,
    afterDailyPrice: undefined,
    adjustPriceType: '',
    adjustPrice: undefined,
    adjustStartDate: '',
    adjustEndDate: '',
    auditStatus: '',
    businessTimeType: '',
    businessStartTime: '',
    businessEndTime: '',
    businessStatus: '',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 6 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    stockTotal: [{ required: true, message: '必填项!' }],
    stock: [{ required: true, message: '必填项!' }],
    parkingPriceSum1: [{ required: true, message: '必填项!' }],
    afterDay: [{ required: true, message: '必填项!' }],
    afterDailyPrice: [{ required: true, message: '必填项!' }],
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
  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    margin-top: 8px;

    .bar {
      color: #1890ff;
      font-weight: bold;
      margin-right: 8px;
      font-size: 16px;
    }

    .title {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
  }
</style>
