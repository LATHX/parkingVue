<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="ParkingOrderForm">
          <!-- 订单信息 -->
          <div class="section-header">
            <span class="section-title">订单信息</span>
          </div>
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="订单时间" name="createTime">
                <a-input v-model:value="formData.createTime" placeholder="请输入订单时间" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="订单号" name="id">
                <a-input v-model:value="formData.id" placeholder="请输入订单号" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="支付方式" name="payType">
                <j-dict-select-tag v-model:value="formData.payType" dictCode="pay_type" placeholder="请选择支付方式" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="关联车场" name="parkingName">
                <a-input v-model:value="formData.parkingName" placeholder="请输入关联车场" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="手机号" name="userId">
                <j-dict-select-tag v-model:value="formData.userId" dictCode="parking_customer,phone,id" placeholder="请选择用户" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="车位类型" name="parkingType">
                <j-dict-select-tag v-model:value="formData.parkingType" dictCode="parking_type" placeholder="请选择车位类型" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="车牌号" name="carPlate">
                <a-input v-model:value="formData.carPlate" placeholder="请输入车牌号" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="出行人数" name="peopleCount">
                <a-input v-model:value="formData.peopleCount" placeholder="请输入出行人数" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="车辆状态" name="carStatus">
                <j-dict-select-tag v-model:value="formData.carStatus" dictCode="car_status" placeholder="请选择车辆状态" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="订单状态" name="payStatus">
                <j-dict-select-tag v-model:value="formData.payStatus" dictCode="pay_status" placeholder="请选择订单状态" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="16"></a-col>

            <a-col :span="8">
              <a-form-item label="预计进场时间" name="predictStartDate">
                <a-date-picker
                  v-model:value="formData.predictStartDate"
                  showTime
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="预计离场时间" name="predictEndDate">
                <a-date-picker
                  v-model:value="formData.predictEndDate"
                  showTime
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="预计停车天数" name="predictDays">
                <a-input v-model:value="formData.predictDays" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="实际进场时间" name="realStartDate">
                <a-date-picker
                  v-model:value="formData.realStartDate"
                  showTime
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="实际离场时间" name="realEndDate">
                <a-date-picker
                  v-model:value="formData.realEndDate"
                  showTime
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="实际停车天数" name="realDays">
                <a-input v-model:value="formData.realDays" disabled />
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 价格体系 -->
          <div class="section-header">
            <span class="section-title">价格体系</span>
          </div>
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="优惠券ID" name="couponId">
                <j-dict-select-tag
                  v-model:value="formData.couponId"
                  dictCode="parking_coupon,id,coupon_name"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="优惠券金额" name="couponPrice">
                <a-input-number v-model:value="formData.couponPrice" style="width: 100%" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="平台承担优惠券金额" name="settlementPlatformCouponPrice">
                <a-input-number v-model:value="formData.settlementPlatformCouponPrice" style="width: 100%" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="商家承担优惠券金额" name="settlementMerchantCouponPrice">
                <a-input-number v-model:value="formData.settlementMerchantCouponPrice" style="width: 100%" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="应付金额" name="payablePrice">
                <a-input-number v-model:value="formData.payablePrice" style="width: 100%" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="首付金额" name="firstRealPrice">
                <a-input-number v-model:value="formData.firstRealPrice" style="width: 100%" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="尾款金额" name="secondRealPrice">
                <a-input-number v-model:value="formData.secondRealPrice" style="width: 100%" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="结算服务费率" name="settlementServiceRate">
                <a-input v-model:value="formData.settlementServiceRate" suffix="%" style="width: 100%" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="结算服务费" name="settlementServicePrice">
                <a-input-number v-model:value="formData.settlementServicePrice" style="width: 100%" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="支付渠道费率" name="settlementRate">
                 <a-input v-model:value="formData.settlementRate" suffix="‰" style="width: 100%" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="支付渠道金额" name="settlementRatePrice">
                <a-input-number v-model:value="formData.settlementRatePrice" style="width: 100%" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="结算金额" name="settlementPrice">
                <a-input-number v-model:value="formData.settlementPrice" style="width: 100%" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="结算日期" name="settlementDate">
                <a-date-picker
                  v-model:value="formData.settlementDate"
                  showTime
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="是否已结算" name="isSettlement">
                <j-dict-select-tag v-model:value="formData.isSettlement" dictCode="yn" disabled />
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
  import { saveOrUpdate } from '../ParkingOrder.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import JDictSelectTag from '../../../../components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JSearchSelect from '../../../../components/Form/src/jeecg/components/JSearchSelect.vue';
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
    createTime: '',
    orderNo: '',
    parkingName: '',
    parkingType: '',
    merchantName: '',
    userId: '',
    payStatus: '',
    carStatus: '',
    predictStartDate: '',
    predictEndDate: '',
    predictDays: '',
    realStartDate: '',
    realEndDate: '',
    realDays: '',
    settlementDate: '',
    carPlate: '',
    couponId: '',
    couponPrice: undefined,
    payablePrice: undefined,
    firstRealPrice: undefined,
    secondRealPrice: undefined,
    payType: '',
    peopleCount: undefined,
    remark: '',
    settlementServiceRate: undefined,
    settlementServicePrice: undefined,
    settlementRate: undefined,
    settlementPrice: undefined,
    settlementRatePrice:'',
    isSettlement: '',
    payChannelRate: undefined,
    payChannelPrice: undefined,
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
    settlementMerchantCouponPrice: '',
    settlementPlatformCouponPrice: '',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 9 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 15 } });
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
      // 赋值
      Object.assign(formData, tmpData);
      
      // 计算天数
      if (formData.predictStartDate && formData.predictEndDate) {
        const start = dayjs(formData.predictStartDate);
        const end = dayjs(formData.predictEndDate);
        formData.predictDays = end.diff(start, 'day');
      }
      
      if (formData.realStartDate && formData.realEndDate) {
        const start = dayjs(formData.realStartDate);
        const end = dayjs(formData.realEndDate);
        formData.realDays = end.diff(start, 'day');
      }
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
