<template>
  <div class="settlement-stats">
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
    <div class="date-filter">
      <div
        v-for="item in dateTypes"
        :key="item.value"
        class="filter-btn"
        :class="{ active: activeDateType === item.value }"
        @click="handleDateTypeChange(item.value)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted, watch } from 'vue';
  import { WalletOutlined, GoldOutlined, BankOutlined } from '@ant-design/icons-vue';
  import { queryIncomeAndPayStatsBySettlementId } from '/@/views/parking/statistics/statistics.api';

  const props = defineProps({
    parkingId: { type: String, default: '' },
  });

  const emit = defineEmits(['dateTypeChange']);

  const activeDateType = ref('D');
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
        type: activeDateType.value
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
</script>

<style lang="less" scoped>
  .settlement-stats {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
    align-items: stretch;
    height: 100px;

    .stat-card {
      background: #fff;
      border-radius: 4px;
      padding: 16px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
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
           font-size: 20px;
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
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 4px;
        font-size: 14px;
        color: #666;
        flex: 1;
        
        &.active {
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
