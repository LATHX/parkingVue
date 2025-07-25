<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="ParkingLotForm">
          <a-row>
            <a-col :span="24">
              <a-form-item label="车场名称" v-bind="validateInfos.parkingName" id="ParkingLotForm-parkingName" name="parkingName">
                <a-input v-model:value="formData.parkingName" placeholder="请输入停车场名" allow-clear />
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item label="商户号" v-bind="validateInfos.merchantId" id="ParkingLotForm-merchantId" name="merchantId">
                <j-dict-select-tag v-model:value="formData.merchantId" dictCode="merchantId" placeholder="请选择商户号" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="地址" v-bind="validateInfos.address" id="ParkingLotForm-address" name="address">
                <a-input v-model:value="formData.address" placeholder="请输入地址" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="纬度" v-bind="validateInfos.lat" id="ParkingLotForm-lat" name="lat">
                <a-input-number v-model:value="formData.lat" placeholder="请输入纬度" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="经度" v-bind="validateInfos.lng" id="ParkingLotForm-lng" name="lng">
                <a-input-number v-model:value="formData.lng" placeholder="请输入经度" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="优势" v-bind="validateInfos.advantage" id="ParkingLotForm-advantage" name="advantage">
                <a-input v-model:value="formData.advantage" placeholder="请输入优势" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="起停天数" v-bind="validateInfos.startDay" id="ParkingLotForm-startDay" name="startDay">
                <a-input-number min="0" v-model:value="formData.startDay" placeholder="请输入起停天数" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="停车场服务标签"
                v-bind="validateInfos.parkingServiceTags"
                id="ParkingLotForm-parkingServiceTags"
                name="parkingServiceTags"
              >
                <j-dict-select-tag
                  mode="multiple"
                  v-model:value="formData.parkingServiceTags"
                  dictCode="parking_service_tags"
                  placeholder="请选择停车场服务标签"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="停车场设施标签"
                v-bind="validateInfos.parkingInstructmentTags"
                id="ParkingLotForm-parkingInstructmentTags"
                name="parkingInstructmentTags"
              >
                <j-dict-select-tag
                  mode="multiple"
                  v-model:value="formData.parkingInstructmentTags"
                  dictCode="parking_instructment_tags"
                  placeholder="请选择停车场设施标签"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="停车场其他标签"
                v-bind="validateInfos.parkingOtherTags"
                id="ParkingLotForm-parkingOtherTags"
                name="parkingOtherTags"
              >
                <j-dict-select-tag
                  mode="multiple"
                  v-model:value="formData.parkingOtherTags"
                  dictCode="parking_other_tags"
                  placeholder="请选择停车场其他标签"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="可用优惠卷" v-bind="validateInfos.isSupportCoupon" id="ParkingLotForm-isSupportCoupon" name="isSupportCoupon">
                <j-dict-select-tag v-model:value="formData.isSupportCoupon" dictCode="yn" placeholder="请选择可用优惠卷" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="发送短信" v-bind="validateInfos.isSupportSms" id="ParkingLotForm-isSupportSms" name="isSupportSms">
                <j-dict-select-tag v-model:value="formData.isSupportSms" dictCode="yn" placeholder="请选择发送短信" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="紧急联系人" v-bind="validateInfos.contact" id="ParkingLotForm-contact" name="contact">
                <a-input v-model:value="formData.contact" placeholder="请输入紧急联系人" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="紧急联系人电话" v-bind="validateInfos.phone" id="ParkingLotForm-phone" name="phone">
                <a-input v-model:value="formData.phone" placeholder="请输入紧急联系人电话" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="备用电话" v-bind="validateInfos.backupPhone" id="ParkingLotForm-backupPhone" name="backupPhone">
                <a-input v-model:value="formData.backupPhone" placeholder="请输入备用电话" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="收费规则" v-bind="validateInfos.chargeRule" id="ParkingLotForm-chargeRule" name="chargeRule">
                <a-input v-model:value="formData.chargeRule" placeholder="请输入收费规则" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="退费规则" v-bind="validateInfos.refundRule" id="ParkingLotForm-refundRule" name="refundRule">
                <a-input v-model:value="formData.refundRule" placeholder="请输入退费规则" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="接送类型" v-bind="validateInfos.transferType" id="ParkingLotForm-transferType" name="transferType">
                <j-dict-select-tag v-model:value="formData.transferType" dictCode="transfer_type" placeholder="请选择接送类型" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="接送开始时间"
                v-bind="validateInfos.transferStartTime"
                id="ParkingLotForm-transferStartTime"
                name="transferStartTime"
              >
                <time-picker
                  placeholder="请选择接送开始时间"
                  value-format="HH:mm:ss"
                  v-model:value="formData.transferStartTime"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="接送结束时间" v-bind="validateInfos.transferEndTime" id="ParkingLotForm-transferEndTime" name="transferEndTime">
                <time-picker
                  placeholder="请选择接送结束时间"
                  value-format="HH:mm:ss"
                  v-model:value="formData.transferEndTime"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="免停分钟" v-bind="validateInfos.freeTimeOutMinute" id="ParkingLotForm-freeTimeOutMinute" name="freeTimeOutMinute">
                <a-input-number v-model:value="formData.freeTimeOutMinute" placeholder="请输入免停分钟" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="车场位置" v-bind="validateInfos.parkingLocationId" id="ParkingLotForm-parkingLocationId" name="parkingLocationId">
                <j-dict-select-tag
                  v-model:value="formData.parkingLocationId"
                  dictCode="parking_location,location_name,id"
                  placeholder="请选择车场位置"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="评价分数" v-bind="validateInfos.evaluateScore" id="ParkingLotForm-evaluateScore" name="evaluateScore">
                <a-input-number v-model:value="formData.evaluateScore" placeholder="请输入评价分数" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="评价文字" v-bind="validateInfos.evaluateLabel" id="ParkingLotForm-evaluateLabel" name="evaluateLabel">
                <a-input v-model:value="formData.evaluateLabel" placeholder="请输入评价文字" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="距离文字" v-bind="validateInfos.distanceLabel" id="ParkingLotForm-distanceLabel" name="distanceLabel">
                <a-input v-model:value="formData.distanceLabel" placeholder="请输入距离文字" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="月销量" v-bind="validateInfos.monthSell" id="ParkingLotForm-monthSell" name="monthSell">
                <a-input-number v-model:value="formData.monthSell" placeholder="请输入月销量" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="计费类型" v-bind="validateInfos.feeType" id="ParkingLotForm-feeType" name="feeType">
                <j-dict-select-tag v-model:value="formData.feeType" dictCode="fee_type" placeholder="请选择计费类型" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="计费方式" v-bind="validateInfos.feeMethod" id="ParkingLotForm-feeMethod" name="feeMethod">
                <j-dict-select-tag v-model:value="formData.feeMethod" dictCode="fee_method" placeholder="请选择计费方式" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="预付费价格" v-bind="validateInfos.prepayPrice" id="ParkingLotForm-prepayPrice" name="prepayPrice">
                <a-input-number v-model:value="formData.prepayPrice" placeholder="请输入预付费价格" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="排序" v-bind="validateInfos.orderNum" id="ParkingLotForm-orderNum" name="orderNum">
                <a-input-number v-model:value="formData.orderNum" placeholder="请输入排序" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="永久休息" v-bind="validateInfos.isRest" id="ParkingLotForm-isRest" name="isRest">
                <j-dict-select-tag v-model:value="formData.isRest" dictCode="yn" placeholder="请选择休息状态" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="休息开始日" v-bind="validateInfos.restStartDate" id="ParkingPriceForm-restStartDate" name="restStartDate">
                <a-date-picker
                  placeholder="请选择休息开始日"
                  v-model:value="formData.restStartDate"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="休息结束日" v-bind="validateInfos.restEndDate" id="ParkingPriceForm-restEndDate" name="restEndDate">
                <a-date-picker
                  placeholder="请选择休息结束日"
                  v-model:value="formData.restEndDate"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="关联商户" v-bind="validateInfos.isRest" id="ParkingLotForm-merchantId" name="merchantId">
                <j-dict-select-tag v-model:value="formData.merchantId" dictCode="parking_merchant,phone,id" placeholder="请选择关联商户" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="审核状态" v-bind="validateInfos.auditStatus" id="ParkingLotForm-auditStatus" name="auditStatus">
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
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../ParkingLot.api';
  import { Form, TimePicker } from 'ant-design-vue';
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
    address: '',
    lat: undefined,
    lng: undefined,
    advantage: '',
    parkingName: '',
    startDay: '',
    parkingServiceTags: '',
    parkingInstructmentTags: '',
    parkingOtherTags: '',
    isSupportCoupon: undefined,
    isSupportSms: undefined,
    contact: '',
    phone: '',
    backupPhone: '',
    chargeRule: '',
    refundRule: '',
    transferType: undefined,
    transferStartTime: '',
    transferEndTime: '',
    freeTimeOutMinute: undefined,
    parkingLocationId: '',
    evaluateScore: undefined,
    evaluateLabel: '',
    distanceLabel: '',
    monthSell: undefined,
    feeType: undefined,
    feeMethod: undefined,
    prepayPrice: undefined,
    orderNum: undefined,
    auditStatus: undefined,
    restStartDate: '',
    restEndDate: '',
    isRest: undefined,
    merchantId: undefined,
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    feeType: [{ required: true, message: '请输入计费类型!' }],
    feeMethod: [{ required: true, message: '请输入计费方式!' }],
    prepayPrice: [{ required: true, message: '请输入预付费价格!' }],
    startDay: [{ required: true, message: '请输入起停天数!' }],
    auditStatus: [{ required: true, message: '请输入审核状态!' }],
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
