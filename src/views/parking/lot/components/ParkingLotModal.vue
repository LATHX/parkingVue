<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    @ok="handleOk"
    :okButtonProps="{ class: { 'jee-hidden': disableSubmit } }"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <ParkingLotImageList :parking-id="parkingId" v-if="showType === 'parkingLotImage'" />
    <ParkingPriceList :parking-id="parkingId" v-if="showType === 'parkingPriceList'" />
    <ParkingLotForm ref="registerForm" @ok="submitCallback" :formDisabled="disableSubmit" :formBpm="false" v-if="showType === ''" />
  </j-modal>
</template>

<script lang="ts" setup>
  import { ref, nextTick, defineExpose } from 'vue';
  import ParkingLotForm from './ParkingLotForm.vue';
  import JModal from '/@/components/Modal/src/JModal/JModal.vue';
  import ParkingLotImageList from '@/views/parking/image/ParkingLotImageList.vue';
  import ParkingPriceList from '@/views/parking/price/ParkingPriceList.vue';

  let parkingId = ref('')
  const title = ref<string>('');
  const width = ref<number>(1200);
  const visible = ref<boolean>(false);
  const disableSubmit = ref<boolean>(false);
  const registerForm = ref();
  const emit = defineEmits(['register', 'success']);
  let showType = ref('');

  function showOther(showTypeParam) {
    showType = ref(showTypeParam);
    title.value = '设置';
    visible.value = true;
  }

  /**
   * 新增
   */
  function add() {
    showType = ref('');
    title.value = '新增';
    visible.value = true;
    nextTick(() => {
      registerForm.value.add();
    });
  }

  /**
   * 编辑
   * @param record
   */
  function edit(record) {
    showType = ref('');
    title.value = disableSubmit.value ? '详情' : '编辑';
    visible.value = true;
    nextTick(() => {
      registerForm.value.edit(record);
    });
  }

  /**
   * 确定按钮点击事件
   */
  function handleOk() {
    registerForm.value.submitForm();
  }

  /**
   * form保存回调事件
   */
  function submitCallback() {
    handleCancel();
    emit('success');
  }

  /**
   * 取消按钮回调事件
   */
  function handleCancel() {
    visible.value = false;
  }

  defineExpose({
    showOther,
    add,
    edit,
    disableSubmit,
    parkingId,
  });
</script>

<style lang="less">
  /**隐藏样式-modal确定按钮 */
  .jee-hidden {
    display: none !important;
  }
</style>
<style lang="less" scoped></style>
