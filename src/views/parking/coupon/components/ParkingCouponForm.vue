<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="ParkingCouponForm">
          <a-row>
            <a-col :span="24">
              <a-form-item label="优惠卷名称" v-bind="validateInfos.couponName" id="ParkingCouponForm-couponName" name="couponName">
                <a-input v-model:value="formData.couponName" placeholder="请输入优惠卷名称" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="优惠卷类型" v-bind="validateInfos.couponType" id="ParkingCouponForm-couponType" name="couponType">
                <j-search-select v-model:value="formData.couponType" dict="coupon_type" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="开始时间" v-bind="validateInfos.startTime" id="ParkingCouponForm-startTime" name="startTime">
                <a-date-picker
                  placeholder="请选择开始时间"
                  v-model:value="formData.startTime"
                  showTime
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="结束时间" v-bind="validateInfos.endTime" id="ParkingCouponForm-endTime" name="endTime">
                <a-date-picker
                  placeholder="请选择结束时间"
                  v-model:value="formData.endTime"
                  showTime
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="优惠卷金额/折扣" v-bind="validateInfos.discountPrice" id="ParkingCouponForm-discountPrice" name="discountPrice">
                <a-input-number v-model:value="formData.discountPrice" placeholder="请输入优惠卷金额/折扣" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="最大可扣除金额" v-bind="validateInfos.maxPrice" id="ParkingCouponForm-maxPrice" name="maxPrice">
                <a-input-number v-model:value="formData.maxPrice" placeholder="请输入最大可扣除金额" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="满足可用金额" v-bind="validateInfos.limitPrice" id="ParkingCouponForm-limitPrice" name="limitPrice">
                <a-input-number v-model:value="formData.limitPrice" placeholder="请输入满足可用金额" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="平台承担比例(%)" v-bind="validateInfos.platformRate" id="ParkingCouponForm-platformRate" name="platformRate">
                <a-input-number v-model:value="formData.platformRate" placeholder="请输入平台承担比例" style="width: 100%" @keyup="calculatorRate" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="商家承担比例(%)" v-bind="validateInfos.merchantRate" id="ParkingCouponForm-merchantRate" name="merchantRate">
                <a-input-number v-model:value="formData.merchantRate" placeholder="请输入商家承担比例" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="自动发送" v-bind="validateInfos.autoSend" id="ParkingCouponForm-autoSend" name="autoSend">
                <j-search-select v-model:value="formData.autoSend" dict="yn" allow-clear />
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
  import JSearchSelect from '/@/components/Form/src/jeecg/components/JSearchSelect.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../ParkingCoupon.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';

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
    couponName: '',
    startTime: '',
    endTime: '',
    couponType: '',
    platformRate: '',
    merchantRate: '',
    discountPrice: undefined,
    maxPrice: undefined,
    limitPrice: undefined,
    autoSend: '',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    platformRate: [{ required: true, message: '请输入平台承担比例!' }],
    merchantRate: [{ required: true, message: '请输入商家承担比例!' }],
    couponType: [{ required: true, message: '请输入优惠卷类型!' }],
    couponName: [{ required: true, message: '请输入优惠卷名称!' }],
    startTime: [{ required: true, message: '请输入开始时间!' }],
    endTime: [{ required: true, message: '请输入结束时间!' }],
    discountPrice: [{ required: true, message: '请输入优惠卷金额/折扣!' }],
    maxPrice: [{ required: true, message: '请输入最大可扣除金额!' }],
    limitPrice: [{ required: true, message: '请输入满足可用金额!' }],
    autoSend: [{ required: true, message: '请输入自动发送!' }],
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

  function calculatorRate() {
    if (formData.platformRate > 100) {
      formData.platformRate = 100;
    }
    let rate = 100 - formData.platformRate;
    formData.merchantRate = rate;
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
