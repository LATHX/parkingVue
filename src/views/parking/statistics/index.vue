<template>
  <div class="statistics-view">
    <StatCards />
    <MiddleSection />
    <BottomSection />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import StatCards from './components/StatCards.vue';
  import MiddleSection from './components/MiddleSection.vue';
  import BottomSection from './components/BottomSection.vue';

  export default defineComponent({
    name: 'ParkingStatistics',
    components: {
      StatCards,
      MiddleSection,
      BottomSection,
    },
  });
</script>

<style lang="less" scoped>
  .statistics-view {
    padding: 0px;
    background-color: rgba(240, 244, 250, 1);
    min-height: 100%;
  }
</style>
