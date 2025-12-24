<template>
  <div class="middle-section">
    <!-- Order Statistics Chart -->
    <div class="chart-card order-chart">
      <div class="card-header">
        <span class="title">订单统计</span>
        <div class="actions">
          <span class="active">日</span>
          <span>月</span>
          <span>年</span>
        </div>
      </div>
      <div class="chart-content">
        <SingleLine 
          :chartData="chartData" 
          height="100%" 
          width="100%" 
          seriesColor="#1890ff"
          :option="chartOption"
        />
      </div>
    </div>

    <!-- City Ranking -->
    <div class="chart-card city-ranking">
      <div class="card-header">
        <span class="title">订单量前五城市</span>
      </div>
      <div class="ranking-table">
        <div class="table-header">
          <span>城市名称</span>
          <span>订单数量</span>
          <span>订单金额</span>
        </div>
        <div class="table-row" v-for="(item, index) in cityData" :key="index">
          <span>{{ item.city }}</span>
          <span>{{ item.count }}</span>
          <span>{{ item.amount }}</span>
        </div>
      </div>
    </div>

    <!-- Latest Orders -->
    <div class="chart-card latest-orders">
      <div class="card-header">
        <span class="title">最新订单</span>
      </div>
      <div class="order-list">
        <div :class="['order-item', 'status-tag', item.statusClass]" v-for="(item, index) in latestOrders" :key="index">
          <div class="order-info">
            <div class="order-main">
              <span class="order-id">{{ item.id }} 提交了订单</span>
              <span :class="['status-tag', item.statusClass]">{{ item.status }}</span>
            </div>
            <div class="order-sub">
              <span>{{ item.parkName }}</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import * as echarts from 'echarts';
  import SingleLine from '/@/components/chart/SingleLine.vue';

  export default defineComponent({
    name: 'MiddleSection',
    components: { SingleLine },
    setup() {
      const cityData = [
        { city: '广州市', count: 2324, amount: '1,345,220' },
        { city: '深圳市', count: 2275, amount: '1,164,590' },
        { city: '东莞市', count: 1935, amount: '992,450' },
        { city: '佛山市', count: 1846, amount: '792,800' },
        { city: '北京市', count: 1799, amount: '654,950' },
      ];

      const latestOrders = [
        { id: '13800138000', status: '待支付', statusClass: 'pending', parkName: 'XXXXXXXX停车场', time: '2025-10-20 15:55:55' },
        { id: '杨光明', status: '进行中', statusClass: 'processing', parkName: 'XXXXXXXX停车场', time: '2025-10-20 15:51:23' },
        { id: '赵梓轩', status: '已取消', statusClass: 'canceled', parkName: 'XXXXXXXX停车场', time: '2025-10-20 15:43:11' },
        { id: '李思思', status: '待付款', statusClass: 'pending-red', parkName: 'XXXXXXXX停车场', time: '2025-10-20 15:30:22' },
      ];

      const chartData = [
        { name: '1月', value: 50 },
        { name: '2月', value: 100 },
        { name: '3月', value: 350 },
        { name: '4月', value: 400 },
        { name: '5月', value: 910 },
        { name: '6月', value: 250 },
        { name: '7月', value: 800 },
        { name: '8月', value: 500 },
        { name: '9月', value: 450 },
        { name: '10月', value: 1320 },
        { name: '11月', value: 300 },
        { name: '12月', value: 400 },
      ];

      const chartOption = {
         grid: { top: 40, right: 20, bottom: 20, left: 40, containLabel: true },
         tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    show: true,
                    backgroundColor: '#333'
                },
            },
            formatter: (params: any) => {
                const item = params[0];
                return `${item.name}<br/>订单数量: ${item.value}`;
            }
         },
         xAxis: {
            type: 'category',
            axisLine: { lineStyle: { color: '#eee' } },
            axisLabel: { color: '#999' },
         },
         yAxis: {
            type: 'value',
            splitLine: { lineStyle: { color: '#eee' } },
            axisLabel: { color: '#999' },
         },
         series: [{
             type: 'line',
             smooth: true,
             showSymbol: true,
             symbol: 'none',
             symbolSize: 8,
             areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(24,144,255,0.2)' },
                    { offset: 1, color: 'rgba(24,144,255,0)' },
                  ]),
             },
             itemStyle: { color: '#1890ff' }
            //  markPoint: {
            //     data: [
            //         { type: 'max', name: 'Max' }
            //     ]
            //  }
         }]
      };

      return { cityData, latestOrders, chartData, chartOption };
    },
  });
</script>

<style lang="less" scoped>
  .middle-section {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
    background-color: rgba(240, 244, 250, 1);

    .chart-card {
      background: white;
      border-radius: 8px;
      padding: 16px;
      height: 350px;
      display: flex;
      flex-direction: column;

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        .title {
          font-weight: bold;
          font-size: 16px;
        }
        .actions {
          span {
            margin-left: 10px;
            cursor: pointer;
            color: #999;
            &.active {
              color: #1890ff;
            }
          }
        }
      }

      .chart-content {
        flex: 1;
      }

      .ranking-table {
        .table-header, .table-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          padding: 12px 0;
          text-align: center;
        }
        .table-header {
            color: #999;
            font-size: 12px;
            background-color: #fafafa; /* Gray header */
            font-weight: bold;
        }
        .table-row {
            font-size: 14px;
            color: #333;
            &:nth-child(even) { /* Zebra striping: even rows (starting after header) get white */
                background-color: #fff;
            }
            &:nth-child(odd) { /* Zebra striping: odd rows get gray */
                background-color: #fafafa;
            }
        }
      }

      .order-list {
          overflow-y: auto;
          .order-item {
              padding: 12px 0;
              border-bottom: 1px solid #f0f0f0;
              &:last-child { border-bottom: none; }
              
              .order-info {
                  .order-main {
                      display: flex;
                      justify-content: space-between;
                      margin-bottom: 6px;
                      .order-id { font-weight: 500; font-size: 14px; }
                      .status-tag {
                          font-size: 12px;
                          padding: 2px 6px;
                          border-radius: 4px;
                          &.pending { background: #fff7e6; color: #fa8c16; }
                          &.processing { background: #e6f7ff; color: #1890ff; }
                          &.canceled { background: #f5f5f5; color: #999; }
                          &.pending-red { background: #fff1f0; color: #f5222d; }
                      }
                  }
                  .order-sub {
                      display: flex;
                      justify-content: space-between;
                      color: #999;
                      font-size: 12px;
                  }
              }
          }
      }
    }
  }
</style>
