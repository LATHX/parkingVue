<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="关联车场" :width="1200" :footer="null">
    <ParkingLotMerchantList :merchantId="merchantId" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import ParkingLotMerchantList from '/@/views/parking/lot/ParkingLotMerchantList.vue';

  const merchantId = ref('');

  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    merchantId.value = data.merchantId;
    setModalProps({ confirmLoading: false });
  });
</script>
