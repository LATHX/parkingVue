<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="disabled">
      <template #detail>
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="ParkingLocationForm">
          <a-row>
            <a-col :span="24">
              <a-form-item label="车场地点" v-bind="validateInfos.locationName" id="ParkingLocationForm-locationName" name="locationName">
                <a-input v-model:value="formData.locationName" placeholder="请输入车场地点" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="图片" v-bind="validateInfos.image" id="ParkingLocationForm-image" name="image">
                <j-image-upload v-model:value="formData.image" file-max="1" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="拼音首字母" v-bind="validateInfos.pinyin" id="ParkingLocationForm-pinyin" name="pinyin">
                <a-input v-model:value="formData.pinyin" placeholder="请输入拼音首字母" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="标签" v-bind="validateInfos.tags" id="ParkingLocationForm-tags" name="tags">
                <a-input v-model:value="formData.tags" placeholder="请输入标签" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="描述" v-bind="validateInfos.description" id="ParkingLocationForm-description" name="description">
                <a-input v-model:value="formData.description" placeholder="请输入描述" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="展示在首页" v-bind="validateInfos.showHomePage" id="ParkingLocationForm-showHomePage" name="showHomePage">
                <j-dict-select-tag v-model:value="formData.showHomePage" placeholder="请选择" dictCode="yn" :string-to-number="true"/>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="场地类型" v-bind="validateInfos.locationType" id="ParkingLocationForm-locationType" name="locationType">
                <j-dict-select-tag
                  v-model:value="formData.locationType"
                  placeholder="请选择场地类型"
                  dictCode="locationType"
                  :string-to-number="true"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="排序序号" v-bind="validateInfos.orderNum" id="ParkingLocationForm-orderNum" name="orderNum">
                <a-input-number v-model:value="formData.orderNum" placeholder="请输入排序序号" style="width: 100%" />
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
  import { saveOrUpdate } from '../ParkingLocation.api';
  import { Form } from 'ant-design-vue';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import { JDictSelectTag, JImageUpload } from "@/components/Form";

  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: () => ({}) },
    formBpm: { type: Boolean, default: true },
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    locationName: '',
    id: '',
    image: '',
    pinyin: '',
    locationType: '',
    tags: '',
    description: '',
    showHomePage: undefined,
    orderNum: undefined,
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = reactive({
    showHomePage: [{ required: true, message: '请输入是否展示在首页!' }],
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
