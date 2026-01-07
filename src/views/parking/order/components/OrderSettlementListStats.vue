<template>
  <div class="order-list-stats">
    <!-- Total & Status -->
    <div class="stat-card main-stats">
      <div class="total-section">
        <div class="label">订单总数</div>
        <div class="value">{{ totalOrders }}</div>
      </div>
      <!-- <div class="status-grid">
        <div class="status-item" v-for="item in statusStats" :key="item.label">
          <span class="label">{{ item.label }}</span>
          <span class="count" :class="item.color">{{ item.value }}</span>
        </div>
      </div> -->
      <div class="filter-icon">
        <AppstoreOutlined />
      </div>
    </div>

    <!-- Money Stats -->
    <div class="stat-card money-card green">
      <div class="header">
        <span class="label">订单金额</span>
        <span class="icon"><WalletOutlined /></span>
      </div>
      <div class="value">{{ incomeStats.orderAmount }}</div>
    </div>

    <div class="stat-card money-card orange">
      <div class="header">
        <span class="label">平台分成</span>
        <span class="icon"><gold-outlined /></span>
      </div>
      <div class="value">{{ incomeStats.platformShare }}</div>
    </div>

    <div class="stat-card money-card red">
      <div class="header">
        <span class="label">车场结算</span>
        <span class="icon"><bank-outlined /></span>
      </div>
      <div class="value">{{ incomeStats.parkingSettlement }}</div>
    </div>

    <!-- Date Filter -->
    <!-- <div class="date-filter">
      <div
        v-for="item in dateTypes"
        :key="item.value"
        class="filter-btn"
        :class="{ active: activeDateType === item.value }"
        @click="handleDateTypeChange(item.value)"
      >
        {{ item.label }}
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
  import { ref, PropType, onMounted, watch, reactive } from 'vue';
  import { AppstoreOutlined, WalletOutlined, GoldOutlined, BankOutlined } from '@ant-design/icons-vue';
  import { queryIncomeAndPayStatsBySettlementId } from '/@/views/parking/statistics/statistics.api';

  const props = defineProps({
    totalOrders: { type: Number, default: 0 },
    statusStats: { type: Array as PropType<any[]>, default: () => [] },
    orderAmount: { type: String, default: '0.00' },
    platformShare: { type: String, default: '0.00' },
    parkingSettlement: { type: String, default: '0.00' },
    parkingId: { type: String, default: '' },
    settlementId: { type: String, default: '' },
  });

  const emit = defineEmits(['dateTypeChange']);

  const activeDateType = ref(null);
  const dateTypes = [
    { label: '日', value: 'D' },
    { label: '月', value: 'M' },
    { label: '年', value: 'Y' },
  ];

  const incomeStats = reactive({
    orderAmount: '0.00',
    platformShare: '0.00',
    parkingSettlement: '0.00',
  });

  async function fetchIncomeStats() {
    try {
      const params = {
        settlementId: props.settlementId
      };
      const res = await queryIncomeAndPayStatsBySettlementId(params);
      if (res) {
        if (res.incomeStats) {
          incomeStats.orderAmount = res.incomeStats.totalAmount !== undefined ? res.incomeStats.totalAmount.toFixed(2) : '0.00';
          incomeStats.platformShare = res.incomeStats.platformIncome !== undefined ? res.incomeStats.platformIncome.toFixed(2) : '0.00';
          incomeStats.parkingSettlement = res.incomeStats.merchantIncome !== undefined ? res.incomeStats.merchantIncome.toFixed(2) : '0.00';
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  function handleDateTypeChange(type: string) {
    activeDateType.value = type;
    emit('dateTypeChange', type);
    fetchIncomeStats();
  }

  onMounted(() => {
    fetchIncomeStats();
  });

  watch(
    () => props.parkingId,
    () => {
      fetchIncomeStats();
    }
  );
  
  watch(
    () => props.settlementId,
    () => {
      fetchIncomeStats();
    }
  );
</script>

<style lang="less" scoped>
  .order-list-stats {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
    align-items: stretch;

    .stat-card {
      background: #fff;
      border-radius: 4px;
      padding: 16px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    }

    .main-stats {
      flex: 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;

      .total-section {
        .label {
          font-size: 14px;
          color: #333;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .value {
          font-size: 32px;
          color: #1890ff;
          font-weight: bold;
        }
      }

      .status-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px 24px;
        flex: 1;
        margin-left: 40px;

        .status-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          
          .label {
            color: #666;
          }
          .count {
            font-weight: bold;
            &.orange { color: #fa8c16; }
            &.blue { color: #1890ff; }
            &.red { color: #f5222d; }
            &.green { color: #52c41a; }
            &.cyan { color: #13c2c2; }
            &.purple { color: #722ed1; }
            &.grey { color: #999; }
          }
        }
      }
      
      .filter-icon {
          position: absolute;
          top: 10px;
          right: 10px;
          color: #1890ff;
          cursor: pointer;
      }
    }

    .money-card {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        .label {
          font-size: 14px;
          color: #666;
        }
        .icon {
            // background: #f0f0f0;
            // border-radius: 50%;
            // padding: 4px;
        }
      }

      .value {
        font-size: 24px;
        font-weight: bold;
      }

      &.green {
        .value { color: #00C292; }
        .icon { color: #00C292; }
      }
      &.orange {
        .value { color: #FA8C16; }
        .icon { color: #FA8C16; }
      }
      &.red {
        .value { color: #F5222D; }
        .icon { color: #F5222D; }
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
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 4px;
        font-size: 14px;
        color: #666;
        flex: 1;
        
        &.active {
          // background: #1890ff;
          color: #1890ff;
          font-weight: bold;
        }
        &:hover:not(.active) {
          background: #f0f0f0;
        }
      }
    }
  }
</style>
