<template>
  <div class="order-stats">
    <!-- Order Counts -->
    <div class="card stats-grid">
      <div class="header">
        <span class="title">订单统计</span>
        <span class="total-count">{{ totalOrders }}</span>
      </div>
      <div class="grid-content">
        <div class="stat-item" v-for="item in orderStats" :key="item.label">
          <div class="count" :class="item.color">{{ item.value }}</div>
          <div class="label">{{ item.label }}</div>
        </div>
      </div>
    </div>

    <!-- City Chart -->
    <div class="card chart-card">
      <div class="title">订单量前五城市</div>
      <div ref="cityChartRef" class="chart-container"></div>
    </div>

    <!-- Parking Chart -->
    <div class="card chart-card">
      <div class="title">订单量前五车场</div>
      <div ref="parkingChartRef" class="chart-container"></div>
    </div>

    <!-- New Orders -->
    <div class="card single-stat">
      <div class="title">新增订单</div>
      <div class="value blue">{{ newOrders.value }}</div>
      <div class="trend">
        环比 {{ Math.abs(newOrders.rate) }}
        <span :class="newOrders.rate >= 0 ? 'up' : 'down'">
          {{ newOrders.rate >= 0 ? '↑' : '↓' }}
        </span>
      </div>
    </div>

    <!-- New Revenue -->
    <div class="card single-stat">
      <div class="title">新增业绩</div>
      <div class="value red">{{ newRevenue.value }}</div>
      <div class="trend">
        环比 {{ Math.abs(newRevenue.rate) }}
        <span :class="newRevenue.rate >= 0 ? 'up' : 'down'">
          {{ newRevenue.rate >= 0 ? '↑' : '↓' }}
        </span>
      </div>
    </div>

    <!-- Date Filter -->
    <div class="date-filter">
      <div
        v-for="item in dateTypes"
        :key="item.value"
        class="filter-btn"
        :class="{ active: activeDateType === item.value }"
        @click="activeDateType = item.value"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, reactive, Ref, watch } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { queryComprehensiveStatistics } from '/@/views/parking/statistics/statistics.api';

  const activeDateType = ref('D');
  const dateTypes = [
    { label: '日', value: 'D' },
    { label: '月', value: 'M' },
    { label: '年', value: 'Y' },
  ];
  const totalOrders = ref(0);

  const statsConfig = [
    { label: '待支付', color: 'orange' },
    { label: '待付尾款', color: 'red' },
    { label: '待退款', color: 'purple' },
    { label: '待完成', color: 'cyan' },
    { label: '进行中', color: 'blue' },
    { label: '已退款', color: 'grey' },
    { label: '已取消', color: 'grey' },
    { label: '已完成', color: 'green' },
  ];

  const orderStats = reactive(statsConfig.map((item) => ({ ...item, value: 0 })));

  const newOrders = reactive({ value: 0, rate: 0 });
  const newRevenue = reactive({ value: '0', rate: 0 });

  const cityChartRef = ref<HTMLDivElement | null>(null);
  const { setOptions: setCityChart } = useECharts(cityChartRef as Ref<HTMLDivElement>);

  const parkingChartRef = ref<HTMLDivElement | null>(null);
  const { setOptions: setParkingChart } = useECharts(parkingChartRef as Ref<HTMLDivElement>);

  // Chart Base Options
  const baseCityOptions = {
    tooltip: { trigger: 'axis' },
    grid: { left: '0%', right: '0%', bottom: '0%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category' as const,
      data: [],
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: { type: 'value' as const, show: false },
    series: [
      {
        data: [],
        type: 'bar' as const,
        barWidth: '30%',
        itemStyle: { color: '#FFB980', borderRadius: [4, 4, 0, 0] },
        label: { show: true, position: 'top', color: '#FFB980' },
      },
    ],
  };

  const baseParkingOptions = {
    tooltip: { trigger: 'axis' },
    grid: { left: '0%', right: '5%', bottom: '0%', top: '15%', containLabel: true },
    xAxis: { type: 'value' as const, show: false },
    yAxis: {
      type: 'category' as const,
      data: [],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { width: 100, overflow: 'truncate' },
    },
    series: [
      {
        data: [],
        type: 'bar' as const,
        barWidth: '10%',
        itemStyle: { color: '#00C292', borderRadius: [0, 4, 4, 0] },
        label: { show: true, position: 'right', color: '#00C292' },
      },
    ],
  };

  onMounted(() => {
    initCharts();
    fetchData();
  });

  watch(activeDateType, () => {
    fetchData();
  });

  async function fetchData() {
    try {
      const res = await queryComprehensiveStatistics({ type: activeDateType.value });
      if (res) {
        // Update totalOrders
        if (res.orderPayStatusStats && res.orderPayStatusStats.total !== undefined) {
          totalOrders.value = res.orderPayStatusStats.total;
        }

        // Update orderStats
        if (res.orderPayStatusStats && res.orderPayStatusStats.list && Array.isArray(res.orderPayStatusStats.list)) {
          // Reset values first
          orderStats.forEach(item => item.value = 0);
          
          res.orderPayStatusStats.list.forEach((stat) => {
            const target = orderStats.find((item) => item.label === stat.name);
            if (target) {
              target.value = stat.count;
            }
          });
        }

        // Update newOrders
        if (res.orderCountRate) {
          newOrders.value = res.orderCountRate.value;
          newOrders.rate = res.orderCountRate.rate;
        }

        // Update newRevenue
        if (res.orderAmountRate) {
          newRevenue.value = res.orderAmountRate.value;
          newRevenue.rate = res.orderAmountRate.rate;
        }

        // Update Charts
        if (res.top5CityStats) {
          const cities = res.top5CityStats.map((i) => i.name);
          const values = res.top5CityStats.map((i) => i.count);
          setCityChart({
            ...baseCityOptions,
            xAxis: { ...baseCityOptions.xAxis, data: cities },
            series: [{ ...baseCityOptions.series[0], data: values }],
          } as any);
        }

        if (res.top5ParkingLotStats) {
          const parks = res.top5ParkingLotStats.map((i) => i.name);
          const values = res.top5ParkingLotStats.map((i) => i.count);
          setParkingChart({
            ...baseParkingOptions,
            yAxis: { ...baseParkingOptions.yAxis, data: parks },
            series: [{ ...baseParkingOptions.series[0], data: values }],
          } as any);
        }
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  }

  function initCharts() {
    setCityChart(baseCityOptions as any);
    setParkingChart(baseParkingOptions as any);
  }
</script>

<style lang="less" scoped>
  .order-stats {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
    height: 200px;

    .card {
      background: #fff;
      border-radius: 4px;
      padding: 16px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
    }

    .stats-grid {
      flex: 1.5;
      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        .title {
          font-weight: bold;
          font-size: 16px;
        }
        .total-count {
          font-size: 24px;
          font-weight: bold;
        }
      }
      .grid-content {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 8px;
        flex: 1;

        .stat-item {
          text-align: center;
          .count {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 4px;
            &.orange { color: #fa8c16; }
            &.red { color: #f5222d; }
            &.purple { color: #722ed1; }
            &.cyan { color: #13c2c2; }
            &.blue { color: #1890ff; }
            &.grey { color: #999; }
            &.green { color: #52c41a; }
          }
          .label {
            font-size: 12px;
            color: #666;
          }
        }
      }
    }

    .chart-card {
      flex: 1;
      .title {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 0px;
      }
      .chart-container {
        flex: 1;
        width: 100%;
        height: calc(100% - 20px); // Adjust for title
        position: relative;
      }
    }

    .single-stat {
      flex: 0.8;
      align-items: center;
      justify-content: center;
      .title {
        font-size: 14px;
        color: #666;
        margin-bottom: 8px;
      }
      .value {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 8px;
        &.blue { color: #1890ff; }
        &.red { color: #f5222d; }
      }
      .trend {
        font-size: 12px;
        color: #999;
        .up { color: #f5222d; }
        .down { color: #52c41a; }
      }
    }

    .date-filter {
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: #fff;
      padding: 8px;
      border-radius: 4px;
      
      .filter-btn {
        width: 32px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 4px;
        font-size: 14px;
        color: #666;
        
        &.active {
          // background: #1890ff;
          color: #1890ff;
        }
        &:hover:not(.active) {
          background: #f0f0f0;
        }
      }
    }
  }
</style>
