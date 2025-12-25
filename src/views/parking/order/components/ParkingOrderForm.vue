<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="ParkingOrderForm">
          <a-row>
            <a-col :span="24">
              <a-form-item label="停车场Id" v-bind="validateInfos.parkingId" id="ParkingPriceForm-parkingId" name="parkingId">
                <j-search-select v-model:value="formData.parkingId" dict="parking_lot,parking_name,id" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="停车场名称" v-bind="validateInfos.parkingName" id="ParkingOrderForm-parkingName" name="parkingName">
                <j-search-select v-model:value="formData.parkingName" dict="parking_lot,parking_name,parking_name" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="停车场类型" v-bind="validateInfos.parkingType" id="ParkingOrderForm-parkingType" name="parkingType">
                <j-dict-select-tag v-model:value="formData.parkingType" dictCode="parking_type" placeholder="请选择停车场类型" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="用户手机号" v-bind="validateInfos.userId" id="ParkingOrderForm-userId" name="userId">
                <j-dict-select-tag v-model:value="formData.userId" dictCode="parking_customer,phone,id" placeholder="请选择用户" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="支付方式" v-bind="validateInfos.payType" id="ParkingOrderForm-payType" name="payType">
                <j-dict-select-tag v-model:value="formData.payType" dictCode="pay_type" placeholder="请选择支付方式" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="支付状态" v-bind="validateInfos.payStatus" id="ParkingOrderForm-payStatus" name="payStatus">
                <j-dict-select-tag v-model:value="formData.payStatus" dictCode="pay_status" placeholder="请选择支付状态" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="车辆状态" v-bind="validateInfos.carStatus" id="ParkingOrderForm-carStatus" name="carStatus">
                <j-dict-select-tag v-model:value="formData.carStatus" dictCode="car_status" placeholder="请选择车辆状态" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="预计进场时间"
                v-bind="validateInfos.predictStartDate"
                id="ParkingOrderForm-predictStartDate"
                name="predictStartDate"
              >
                <a-date-picker
                  placeholder="请选择预计进场时间"
                  v-model:value="formData.predictStartDate"
                  showTime
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                  allow-clear
                  required
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="预计离场时间" v-bind="validateInfos.predictEndDate" id="ParkingOrderForm-predictEndDate" name="predictEndDate">
                <a-date-picker
                  placeholder="请选择预计离场时间"
                  v-model:value="formData.predictEndDate"
                  showTime
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="实际进场时间" v-bind="validateInfos.realStartDate" id="ParkingOrderForm-realStartDate" name="realStartDate">
                <a-date-picker
                  placeholder="请选择实际进场时间"
                  v-model:value="formData.realStartDate"
                  showTime
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="实际离场时间" v-bind="validateInfos.realEndDate" id="ParkingOrderForm-realEndDate" name="realEndDate">
                <a-date-picker
                  placeholder="请选择实际离场时间"
                  v-model:value="formData.realEndDate"
                  showTime
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item label="车牌号" v-bind="validateInfos.carPlate" id="ParkingOrderForm-carPlate" name="carPlate">
                <a-input v-model:value="formData.carPlate" placeholder="请输入车牌号" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="优惠卷" v-bind="validateInfos.couponId" id="ParkingOrderForm-couponId" name="couponId">
                <j-dict-select-tag
                  v-model:value="formData.couponId"
                  dictCode="parking_coupon,id,coupon_name"
                  placeholder="请选择优惠卷"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="优惠卷金额" v-bind="validateInfos.couponPrice" id="ParkingOrderForm-couponPrice" name="couponPrice">
                <a-input-number v-model:value="formData.couponPrice" placeholder="请输入优惠卷金额" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="优惠卷平台承担金额"
                v-bind="validateInfos.settlementPlatformCouponPrice"
                id="ParkingOrderForm-settlementPlatformCouponPrice"
                name="settlementPlatformCouponPrice"
              >
                <a-input-number v-model:value="formData.settlementPlatformCouponPrice" placeholder="请输入优惠卷平台承担金额" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="优惠卷商家承担金额"
                v-bind="validateInfos.settlementMerchantCouponPrice"
                id="ParkingOrderForm-settlementMerchantCouponPrice"
                name="settlementMerchantCouponPrice"
              >
                <a-input-number
                  v-model:value="formData.settlementMerchantCouponPrice"
                  placeholder="请输入结算商家优惠卷承担金额"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="应付金额" v-bind="validateInfos.payablePrice" id="ParkingOrderForm-payablePrice" name="payablePrice">
                <a-input-number v-model:value="formData.payablePrice" placeholder="请输入应付金额" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="首付金额" v-bind="validateInfos.firstRealPrice" id="ParkingOrderForm-firstRealPrice" name="firstRealPrice">
                <a-input-number v-model:value="formData.firstRealPrice" placeholder="请输入首付金额" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="尾款金额" v-bind="validateInfos.secondRealPrice" id="ParkingOrderForm-secondRealPrice" name="secondRealPrice">
                <a-input-number v-model:value="formData.secondRealPrice" placeholder="请输入尾款金额" style="width: 100%" />
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item label="出行人数" v-bind="validateInfos.peopleCount" id="ParkingOrderForm-peopleCount" name="peopleCount">
                <a-input-number v-model:value="formData.peopleCount" placeholder="请输入出行人数" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="备注" v-bind="validateInfos.remark" id="ParkingOrderForm-remark" name="remark">
                <a-textarea v-model:value="formData.remark" placeholder="请输入备注" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="结算日期" v-bind="validateInfos.settlementDate" id="ParkingOrderForm-settlementDate" name="settlementDate">
                <a-date-picker
                  placeholder="请选择结算日期"
                  v-model:value="formData.settlementDate"
                  showTime
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="结算服务费率(%)"
                v-bind="validateInfos.settlementServiceRate"
                id="ParkingOrderForm-settlementServiceRate"
                name="settlementServiceRate"
              >
                <a-input-number v-model:value="formData.settlementServiceRate" placeholder="请输入结算服务费率" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="结算服务费"
                v-bind="validateInfos.settlementServicePrice"
                id="ParkingOrderForm-settlementServicePrice"
                name="settlementServicePrice"
              >
                <a-input-number v-model:value="formData.settlementServicePrice" placeholder="请输入结算服务费" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="结算费率(%)" v-bind="validateInfos.settlementRate" id="ParkingOrderForm-settlementRate" name="settlementRate">
                <a-input-number v-model:value="formData.settlementRate" placeholder="请输入结算费率" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="结算金额" v-bind="validateInfos.settlementPrice" id="ParkingOrderForm-settlementPrice" name="settlementPrice">
                <a-input-number v-model:value="formData.settlementPrice" placeholder="请输入结算金额" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="是否已结算" v-bind="validateInfos.isSettlement" id="ParkingOrderForm-isSettlement" name="isSettlement">
                <j-dict-select-tag v-model:value="formData.isSettlement" dictCode="yn" placeholder="请选择是否已结算" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="第一天总价" v-bind="validateInfos.parkingPriceSum1" id="ParkingOrderForm-parkingPriceSum1" name="parkingPriceSum1">
                <a-input-number v-model:value="formData.parkingPriceSum1" placeholder="请输入第一天总价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="第二天总价" v-bind="validateInfos.parkingPriceSum2" id="ParkingOrderForm-parkingPriceSum2" name="parkingPriceSum2">
                <a-input-number v-model:value="formData.parkingPriceSum2" placeholder="请输入第二天总价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="第三天总价" v-bind="validateInfos.parkingPriceSum3" id="ParkingOrderForm-parkingPriceSum3" name="parkingPriceSum3">
                <a-input-number v-model:value="formData.parkingPriceSum3" placeholder="请输入第三天总价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="第四天总价" v-bind="validateInfos.parkingPriceSum4" id="ParkingOrderForm-parkingPriceSum4" name="parkingPriceSum4">
                <a-input-number v-model:value="formData.parkingPriceSum4" placeholder="请输入第四天总价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="第五天总价" v-bind="validateInfos.parkingPriceSum5" id="ParkingOrderForm-parkingPriceSum5" name="parkingPriceSum5">
                <a-input-number v-model:value="formData.parkingPriceSum5" placeholder="请输入第五天总价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="第六天总价" v-bind="validateInfos.parkingPriceSum6" id="ParkingOrderForm-parkingPriceSum6" name="parkingPriceSum6">
                <a-input-number v-model:value="formData.parkingPriceSum6" placeholder="请输入第六天总价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="第七天总价" v-bind="validateInfos.parkingPriceSum7" id="ParkingOrderForm-parkingPriceSum7" name="parkingPriceSum7">
                <a-input-number v-model:value="formData.parkingPriceSum7" placeholder="请输入第七天总价" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="在X天后" v-bind="validateInfos.afterDay" id="ParkingOrderForm-afterDay" name="afterDay">
                <a-input-number v-model:value="formData.afterDay" placeholder="请输入在X天后" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="在X天后每天价格"
                v-bind="validateInfos.afterDailyPrice"
                id="ParkingOrderForm-afterDailyPrice"
                name="afterDailyPrice"
              >
                <a-input-number v-model:value="formData.afterDailyPrice" placeholder="请输入在X天后每天价格" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="调价类型" v-bind="validateInfos.adjustPriceType" id="ParkingOrderForm-adjustPriceType" name="adjustPriceType">
                <j-dict-select-tag v-model:value="formData.adjustPriceType" dictCode="adjust_price_type" placeholder="请选择调价类型" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="调整价格" v-bind="validateInfos.adjustPrice" id="ParkingOrderForm-adjustPrice" name="adjustPrice">
                <a-input-number v-model:value="formData.adjustPrice" placeholder="请输入调整价格" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="调价开始日" v-bind="validateInfos.adjustStartDate" id="ParkingOrderForm-adjustStartDate" name="adjustStartDate">
                <a-date-picker
                  placeholder="请选择调价开始日"
                  v-model:value="formData.adjustStartDate"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="调价结束日" v-bind="validateInfos.adjustEndDate" id="ParkingOrderForm-adjustEndDate" name="adjustEndDate">
                <a-date-picker
                  placeholder="请选择调价结束日"
                  v-model:value="formData.adjustEndDate"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                  allow-clear
                />
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
    parkingName: '',
    parkingType: '',
    userId: '',
    payStatus: '',
    carStatus: '',
    predictStartDate: '',
    predictEndDate: '',
    realStartDate: '',
    realEndDate: '',
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
    isSettlement: '',
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
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    parkingId: [{ required: true, message: '请输入停车场Id!' }],
    parkingName: [{ required: true, message: '请输入停车场名!' }],
    parkingType: [{ required: true, message: '请输入停车场类型!' }],
    usreId: [{ required: true, message: '请选择用户手机号!' }],
    predictStartDate: [{ required: true, message: '请输入预计进场时间!' }],
    predictEndDate: [{ required: true, message: '请输入预计离场时间!' }],
    carPlate: [{ required: true, message: '请输入车牌号!' }],
    payablePrice: [{ required: true, message: '请输入应付金额!' }],
    firstRealPrice: [{ required: true, message: '请输入首付金额!' }],
    secondRealPrice: [{ required: true, message: '请输入尾款金额!' }],
    peopleCount: [{ required: true, message: '请输入出行人数!' }],
    parkingPriceSum1: [{ required: true, message: '请输入总价!' }],
    parkingPriceSum2: [{ required: true, message: '请输入总价!' }],
    parkingPriceSum3: [{ required: true, message: '请输入总价!' }],
    parkingPriceSum4: [{ required: true, message: '请输入总价!' }],
    parkingPriceSum5: [{ required: true, message: '请输入总价!' }],
    parkingPriceSum6: [{ required: true, message: '请输入总价!' }],
    parkingPriceSum7: [{ required: true, message: '请输入总价!' }],
    afterDay: [{ required: true, message: '请输入X天后!' }],
    afterDailyPrice: [{ required: true, message: '请输入X天后每天价格!' }],
    adjustPriceType: [{ required: true, message: '调价类型!' }],
    payStatus: [{ required: true, message: '请输入支付状态!' }],
    carStatus: [{ required: true, message: '请输入车辆状态!' }],
    isSettlement: [{ required: true, message: '请输入是否已结算!' }],
    adjustPrice: [{ required: true, message: '请输入调整价格!' }],
    payType: [{ required: true, message: '请输入支付方式!' }],
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
    const isUpdate = ref<boolean>(fal
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
