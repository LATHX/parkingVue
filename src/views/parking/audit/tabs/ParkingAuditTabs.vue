<template>
  <a-card :bordered="false">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="车场审核">
        <ParkingLotAuditList />
      </a-tab-pane>
      <a-tab-pane key="2" tab="价格审核">
        <ParkingPriceAuditList />
      </a-tab-pane>
      <a-tab-pane key="3" tab="图片审核">
        <ParkingLotImageAuditList />
      </a-tab-pane>
      <a-tab-pane key="4" tab="资质审核">
        <div class="p-4">资质审核模块开发中...</div>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ParkingLotAuditList from '../../lot/ParkingLotAuditList.vue';
  import ParkingPriceAuditList from '../../price/ParkingPriceAuditList.vue';
  import ParkingLotImageAuditList from '../../image/ParkingLotImageAuditList.vue';

  const activeKey = ref('1');
</script>

<style scoped>
</style>
