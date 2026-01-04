<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    @cancel="handleCancel"
    :footer="null"
    cancelText="关闭"
  >
    <ParkingOrderInfoList :parking-id="parkingId" ref="orderInfoList" />
  </j-modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import JModal from '/@/components/Modal/src/JModal/JModal.vue';
  import ParkingOrderInfoList from '/@/views/parking/order/info/ParkingOrderInfoList.vue';

  const title = ref<string>('订单列表');
  const width = ref<number>(1600);
  const visible = ref<boolean>(false);
  const parkingId = ref<string>('');
  const orderInfoList = ref();

  function show(id: string) {
    parkingId.value = id;
    visible.value = true;
  }

  function handleCancel() {
    visible.value = false;
  }

  defineExpose({
    show,
  });
</script>

<style lang="less">
  .full-modal {
    .ant-modal {
      max-width: 100%;
      top: 0;
      padding-bottom: 0;
      margin: 0;
    }
    .ant-modal-content {
      display: flex;
      flex-direction: column;
      height: calc(100vh);
    }
    .ant-modal-body {
      flex: 1;
    }
  }
</style>
