<template>
  <j-modal
    :title="title"
    :width="1200"
    :visible="visible"
    @cancel="handleCancel"
    :footer="null"
    cancelText="关闭"
    wrapClassName="parking-evaluate-list-modal"
  >
    <ParkingEvaluateList :parking-id="parkingId" ref="evaluateListRef" />
  </j-modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import JModal from '/@/components/Modal/src/JModal/JModal.vue';
  import ParkingEvaluateList from '/@/views/parking/evaluate/ParkingEvaluateList.vue';

  const title = ref<string>('车场评价');
  const visible = ref<boolean>(false);
  const parkingId = ref<string>('');
  const evaluateListRef = ref();

  function show(id: string) {
    console.log(id)
    parkingId.value = id;
    visible.value = true;
  }

  function handleCancel() {
    visible.value = false;
    parkingId.value = '';
  }

  defineExpose({
    show,
  });
</script>

<style lang="less" scoped>
</style>
