<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="结算单详情" :width="1200" :footer="null">
    <ParkingSettlementOrderList v-if="settlementId" :parkingId="parkingId" :settlementId="settlementId" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import ParkingSettlementOrderList from '/@/views/parking/order/settlement/ParkingSettlementOrderList.vue';

  const parkingId = ref('');
  const settlementId = ref('');

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    parkingId.value = data.record?.parkingId || '';
    settlementId.value = data.record?.id || '';
    setModalProps({ confirmLoading: false });
  });
</script>

<style scoped>

</style>
