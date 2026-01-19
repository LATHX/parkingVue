<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="ParkingLotImageForm">
          <a-row>
            <a-col :span="24" :hidden="hiddenParkingId">
              <a-form-item label="停车场名称" v-bind="validateInfos.parkingId" id="ParkingLotImageForm-parkingId" name="parkingId">
                <j-search-select v-model:value="formData.parkingId" dict="parking_lot,parking_name,id,audit_status=1" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="停车场主图" v-bind="validateInfos.mainImg" id="ParkingLotImageForm-mainImg" name="mainImg">
                <j-image-upload :fileMax="0" v-model:value="formData.mainImg" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="停车场内部图" v-bind="validateInfos.innerImg" id="ParkingLotImageForm-innerImg" name="innerImg">
                <j-image-upload :fileMax="0" v-model:value="formData.innerImg" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="停车场出入口" v-bind="validateInfos.exitImg" id="ParkingLotImageForm-exitImg" name="exitImg">
                <j-image-upload :fileMax="0" v-model:value="formData.exitImg" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="接送车图" v-bind="validateInfos.transferCarImg" id="ParkingLotImageForm-transferCarImg" name="transferCarImg">
                <j-image-upload :fileMax="0" v-model:value="formData.transferCarImg" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="监控室图" v-bind="validateInfos.secureImg" id="ParkingLotImageForm-secureImg" name="secureImg">
                <j-image-upload :fileMax="0" v-model:value="formData.secureImg" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="休息室图" v-bind="validateInfos.breakroomImg" id="ParkingLotImageForm-breakroomImg" name="breakroomImg">
                <j-image-upload :fileMax="0" v-model:value="formData.breakroomImg" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="其它图片" v-bind="validateInfos.otherImg" id="ParkingLotImageForm-otherImg" name="otherImg">
                <j-image-upload :fileMax="0" v-model:value="formData.otherImg" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="审核状态" v-bind="validateInfos.auditStatus" id="ParkingLotImageForm-auditStatus" name="auditStatus">
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
  import JImageUpload from '/@/components/Form/src/jeecg/components/JImageUpload.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../ParkingLotImage.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import JSearchSelect from '../../../../components/Form/src/jeecg/components/JSearchSelect.vue';

  const hiddenParkingId = ref(true)
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
    mainImg: '',
    innerImg: '',
    exitImg: '',
    transferCarImg: '',
    secureImg: '',
    breakroomImg: '',
    otherImg: '',
    auditStatus: undefined,
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
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
    hiddenParkingId.value = false;
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
