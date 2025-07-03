<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="ParkingUserCouponForm">
          <a-row>
            <a-col :span="24">
              <a-form-item label="用户手机号" v-bind="validateInfos.userId" id="ParkingUserCouponForm-userId" name="userId">
                <j-search-select v-model:value="formData.userId" dict="parking_customer,phone,id" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="优惠卷选择" v-bind="validateInfos.couponId" id="ParkingUserCouponForm-couponId" name="couponId">
                <j-search-select v-model:value="formData.couponId" dict="parking_coupon,coupon_name,id" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="开始时间(自动填充)" v-bind="validateInfos.startTime" id="ParkingUserCouponForm-startTime" name="startTime">
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
              <a-form-item label="结束时间(自动填充)" v-bind="validateInfos.endTime" id="ParkingUserCouponForm-endTime" name="endTime">
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
              <a-form-item label="优惠卷状态" v-bind="validateInfos.couponStatus" id="ParkingUserCouponForm-couponStatus" name="couponStatus">
                <j-search-select v-model:value="formData.couponStatus" dict="coupon_status" allow-clear />
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
  import { saveOrUpdate } from '../ParkingUserCoupon.api';
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
    userId: '',
    startTime: '',
    endTime: '',
    couponId: '',
    couponStatus: '',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    couponId: [{ required: true, message: '请选择优惠卷' }],
    userId: [{ required: true, message: '请输入用户id!' }],
    // startTime: [{ required: true, message: '请输入开始时间!' }],
    // endTime: [{ required: true, message: '请输入结束时间!' }],
    couponStatus: [{ required: true, message: '请输入优惠卷状态!' }],
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
