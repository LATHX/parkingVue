<template>
  <div class="middle-section">
    <!-- Order Statistics Chart -->
    <div class="chart-card order-chart">
      <div class="card-header">
        <span class="title">订单统计</span>
        <div class="actions">
          <span :class="{ active: timeType === 'D' }" @click="handleTypeChange('D')">日</span>
          <span :class="{ active: timeType === 'M' }" @click="handleTypeChange('M')">月</span>
          <span :class="{ active: timeType === 'Y' }" @click="handleTypeChange('Y')">年</span>
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
          <span>{{ item.amount.toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <!-- Latest Orders -->
    <div class="chart-card latest-orders">
      <div class="card-header">
        <span class="title">最新订单</span>
      </div>
      <div class="order-list">
        <div :class="['order-item', item.statusClass]" v-for="(item, index) in latestOrders" :key="index">
          <div class="order-info">
            <div class="order-main">
              <span class="order-id">{{ item.id }} 提交了订单</span>
              <span :class="['status-tag', item.statusClass]">{{ item.status }}</span>
            </div>
            <div class="order-sub">
              <span class="park-name" :title="item.parkName">{{ item.parkName }}</span>
                      <span class="order-time">{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import * as echarts from 'echarts';
  import SingleLine from '/@/components/chart/SingleLine.vue';
  import { queryOrderChartStatistics, queryTop5CityOrderStatistics, queryNewOrderStatistics } from '../statistics.api';

  export default defineComponent({
    name: 'MiddleSection',
    components: { SingleLine },
    setup() {
      const cityData = ref<any[]>([]);
      const latestOrders = ref<any[]>([]);

      const getStatusClass = (status: string) => {
        switch (status) {
          case '0': // 待支付
          case '2': // 待付尾款
          case '7': // 待完成
          case '5': // 待退款
          case '1': // 进行中
            return 'processing';break;
          case '3': // 已完成
            return 'processing';break;
          case '4': // 系统结单
            return 'processing';break;
          case '8': // 已退款
            return 'pending-red'; break;
          case '6': // 已取消
            return 'pending-red';break;
          default:
            return '';
        }
      };

      const getStatusText = (status: string) => {
        const map: Record<string, string> = {
          '0': '待支付',
          '1': '进行中',
          '2': '待付尾款',
          '3': '已完成',
          '4': '系统结单',
          '5': '待退款',
          '6': '已取消',
          '7': '待完成',
          '8': '已退款'
        };
        return map[status] || status;
      };

      const chartData = ref<any[]>([]);
      const timeType = ref('D'); // D: Day, M: Month, Y: Year

      const fetchOrderStats = async () => {
        try {
          const res = await queryOrderChartStatistics({ type: timeType.value });
          if (res && res.result) {
            chartData.value = res.result;
          } else if (Array.isArray(res)) {
            chartData.value = res;
          }
        } catch (error) {
          console.error('Failed to fetch order statistics:', error);
        }
      };

      const fetchCityStats = async () => {
        try {
          const res = await queryTop5CityOrderStatistics();
          const data = Array.isArray(res) ? res : res?.result;
          if (Array.isArray(data)) {
            cityData.value = data.map((item: any) => ({
              city: item.name,
              count: item.value,
              amount: item.amount
            }));
          }
        } catch (error) {
          console.error('Failed to fetch city statistics:', error);
        }
      };

      const fetchLatestOrders = async () => {
        try {
            const res = await queryNewOrderStatistics();
            // Handle both direct array (if API changes back) or Page object (records)
            const data = Array.isArray(res) ? res : (res?.records || res?.result);
            
            if (Array.isArray(data)) {
                latestOrders.value = data.map((item: any) => ({
                    id: item.userId_dictText || item.userId, // Prefer dictText if available
                    status: getStatusText(item.payStatus),
                    statusClass: getStatusClass(item.payStatus),
                    parkName: item.parkingName,
                    time: item.createTime
                }));
            }
        } catch (error) {
            console.error('Failed to fetch latest orders:', error);
        }
      };

      const handleTypeChange = (type: string) => {
        timeType.value = type;
        fetchOrderStats();
      };

      onMounted(() => {
        fetchOrderStats();
        fetchCityStats();
        fetchLatestOrders();
      });

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

      return { cityData, latestOrders, chartData, chartOption, timeType, handleTypeChange };
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
          overflow: hidden; /* Hide scrollbar */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          
          .order-item {
              padding: 8px 12px; /* Reduce padding slightly, add horizontal padding */
              border-radius: 6px; /* Add rounded corners */
              margin-bottom: 8px; /* Add spacing between items */
              &:last-child { margin-bottom: 0; }
              
              /* Dynamic background colors based on status class */
              &.pending { background: #fff7e6; }
              &.processing { background: #e6f7ff; }
              &.canceled { background: #f5f5f5; }
              &.pending-red { background: #fff1f0; }

              .order-info {
                  .order-main {
                      display: flex;
                      justify-content: space-between;
                      margin-bottom: 4px; /* Reduce margin */
                      .order-id { font-weight: 500; font-size: 13px; } /* Slightly smaller font */
                      .status-tag {
                          font-size: 12px;
                          padding: 1px 5px; /* Compact tag */
                          border-radius: 4px;
                          color: white !important; /* Force white text */
                          
                          /* Match tag background to item background's "text color" counterpart */
                          &.pending { background: #fa8c16 !important; }
                          &.processing { background: #1890ff !important; }
                          &.canceled { background: #999 !important; }
                          &.pending-red { background: #f5222d !important; }
                      }
                  }
                  .order-sub {
                      display: flex;
                      justify-content: space-between;
                      color: #666; /* Darker text for better contrast on colored backgrounds */
                      font-size: 12px;
                      
                      .park-name {
                          flex: 1;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                          margin-right: 8px; /* Add some spacing between name and time */
                      }

                      .order-time {
                          flex-shrink: 0; /* Prevent time from shrinking */
                          font-size: 11px; /* Slightly smaller time font */
                      }
                  }
              }
          }
      }
    }
  }
</style>
