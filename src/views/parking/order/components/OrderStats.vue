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
        v-for="type in ['日', '月', '年']"
        :key="type"
        class="filter-btn"
        :class="{ active: activeDateType === type }"
        @click="activeDateType = type"
      >
        {{ type }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, reactive, Ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';

  const activeDateType = ref('日');
  const totalOrders = ref(2854);

  const orderStats = reactive([
    { label: '待支付', value: 23, color: 'orange' },
    { label: '待付尾款', value: 8, color: 'red' },
    { label: '待退款', value: 0, color: 'purple' },
    { label: '待完成', value: 2, color: 'cyan' },
    { label: '进行中', value: 237, color: 'blue' },
    { label: '已退款', value: 14, color: 'grey' },
    { label: '已取消', value: 5, color: 'grey' },
    { label: '已完成', value: 1862, color: 'green' },
  ]);

  const newOrders = reactive({ value: 285, rate: -5 });
  const newRevenue = reactive({ value: '24,540', rate: 365 });

  const cityChartRef = ref<HTMLDivElement | null>(null);
  const { setOptions: setCityChart } = useECharts(cityChartRef as Ref<HTMLDivElement>);

  const parkingChartRef = ref<HTMLDivElement | null>(null);
  const { setOptions: setParkingChart } = useECharts(parkingChartRef as Ref<HTMLDivElement>);

  onMounted(() => {
    initCharts();
  });

  function initCharts() {
    setCityChart({
      tooltip: { trigger: 'axis' },
      grid: { left: '-40px', right: '0%', bottom: '0%', top: '15%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['广州', '深圳', '上海', '北京', '苏州'],
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: { type: 'value', show: false },
      series: [
        {
          data: [1269, 1031, 864, 650, 342],
          type: 'bar',
          barWidth: '30%',
          itemStyle: { color: '#FFB980', borderRadius: [4, 4, 0, 0] },
          label: { show: true, position: 'top', color: '#FFB980' },
        },
      ],
    });

    setParkingChart({
      tooltip: { trigger: 'axis' },
      grid: { left: '0%', right: '5%', bottom: '0%', top: '15%', containLabel: true },
      xAxis: { type: 'value', show: false },
      yAxis: {
        type: 'category',
        data: ['XXXX停车场', 'XXXX停车场', 'XXXX停车场', 'XXXX停车场', 'XXXX停车场'],
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { width: 100, overflow: 'truncate' },
      },
      series: [
        {
          data: [29, 36, 40, 54, 82],
          type: 'bar',
          barWidth: '20%',
          itemStyle: { color: '#00C292', borderRadius: [0, 4, 4, 0] },
          label: { show: true, position: 'right', color: '#00C292' },
        },
      ],
    });
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
