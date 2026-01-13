<template>
  <a-card :bordered="false">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="优惠卷配置">
        <ParkingCouponList />
      </a-tab-pane>
      <a-tab-pane key="2" tab="用户优惠卷">
        <ParkingUserCouponList />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script lang="ts" setup name="ParkingCouponTabs">
  import ParkingCouponList from './ParkingCouponList.vue';
  import ParkingUserCouponList from '../userCoupon/ParkingUserCouponList.vue';
</script>
