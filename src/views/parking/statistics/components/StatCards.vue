<template>
    <div class="stat-cards-container">
        <div class="stat-card purple">
            <div class="card-content">
                <div class="title">入驻车场</div>
                <div class="value">{{ stats.parkingCount }}</div>
                <div class="sub-value">今日新增 +{{ stats.parkingAdd }}</div>
            </div>
            <div class="chart-mini" :style="{ backgroundImage: `url(${iconParking})` }"></div>
        </div>

        <div class="stat-card orange">
            <div class="card-content">
                <div class="title">车场商户</div>
                <div class="value">{{ stats.merchantCount }}</div>
                <div class="sub-value">今日新增 +{{ stats.merchantAdd }}</div>
            </div>
            <div class="chart-mini" :style="{ backgroundImage: `url(${iconMerchant})` }"></div>
        </div>

        <div class="stat-card green">
            <div class="card-content">
                <div class="title">车场顾客</div>
                <div class="value">{{ stats.userCount }}</div>
                <div class="sub-value">今日新增 +{{ stats.userAdd }}</div>
            </div>
            <div class="chart-mini" :style="{ backgroundImage: `url(${iconCustomer})` }"></div>
        </div>

        <div class="stat-card blue">
            <div class="card-content">
                <div class="title">订单总数</div>
                <div class="value">{{ stats.orderCount?.toLocaleString() }}</div>
                <div class="sub-value">今日新增 +{{ stats.orderAdd?.toLocaleString() }}</div>
            </div>
            <div class="chart-mini" :style="{ backgroundImage: `url(${iconOrder})` }"></div>
        </div>

        <div class="stat-card red">
            <div class="card-content">
                <div class="title">订单金额</div>
                <div class="value">{{ stats.orderPrice?.toLocaleString() }}</div>
                <div class="sub-value">今日新增 +{{ stats.orderPriceAdd?.toLocaleString() }}</div>
            </div>
            <div class="chart-mini" :style="{ backgroundImage: `url(${iconAmount})` }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { queryDataStatistics } from '../statistics.api';
import iconParking from '/@/assets/customerize/statistics/top/入驻车场.png';
import iconMerchant from '/@/assets/customerize/statistics/top/车场商户.png';
import iconCustomer from '/@/assets/customerize/statistics/top/车场顾客.png';
import iconOrder from '/@/assets/customerize/statistics/top/订单总数.png';
import iconAmount from '/@/assets/customerize/statistics/top/订单金额.png';

const stats = ref({
    parkingCount: 0,
    parkingAdd: 0,
    merchantCount: 0,
    merchantAdd: 0,
    userCount: 0,
    userAdd: 0,
    orderCount: 0,
    orderAdd: 0,
    orderPrice: 0,
    orderPriceAdd: 0
});

onMounted(async () => {
    try {
        const res = await queryDataStatistics();
        const data = Array.isArray(res) ? res : res?.result;
        
        if (Array.isArray(data)) {
            data.forEach((item: any) => {
                switch (item.name) {
                    case 'parkingLot':
                        stats.value.parkingCount = item.total;
                        stats.value.parkingAdd = item.todayTotal;
                        break;
                    case 'merchant':
                        stats.value.merchantCount = item.total;
                        stats.value.merchantAdd = item.todayTotal;
                        break;
                    case 'customer':
                        stats.value.userCount = item.total;
                        stats.value.userAdd = item.todayTotal;
                        break;
                    case 'order':
                        stats.value.orderCount = item.total;
                        stats.value.orderAdd = item.todayTotal;
                        break;
                    case 'orderAmount':
                        stats.value.orderPrice = item.total;
                        stats.value.orderPriceAdd = item.todayTotal;
                        break;
                }
            });
        }
    } catch (error) {
        console.error('Failed to fetch statistics:', error);
    }
});
</script>

<style lang="less" scoped>
.stat-cards-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    margin-bottom: 16px;

    .stat-card {
        border-radius: 12px;
        padding: 20px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        overflow: hidden;
        height: 140px;

        .card-content {
            z-index: 2; /* Ensure text is above background */

            .title {
                font-size: 14px;
                opacity: 0.9;
                margin-bottom: 8px;
                white-space: nowrap;
            }

            .value {
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 8px;
            }

            .sub-value {
                font-size: 12px;
                opacity: 0.8;
                white-space: nowrap;
            }
        }

        .chart-mini {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 85%; /* Adjust width as needed, maybe 60% or auto */
            background-repeat: no-repeat;
            background-position: right center; /* Align to right */
            background-size: contain; /* Stretch to fit */
            opacity: 0.8; /* Optional: slight transparency if it interferes too much */
            z-index: 1;
            pointer-events: none;
        }

        &.purple {
            background: linear-gradient(135deg, #9F5BFF 0%, #C4A2F3 100%);
            box-shadow: 4px 8px 32px 0px rgba(186, 202, 234, 0.2);
        }

        &.orange {
            background: linear-gradient(135deg, #F5BF56 0%, #F5E093 100%);
            box-shadow: 4px 8px 32px 0px rgba(186, 202, 234, 0.2);
        }

        &.green {
            background: linear-gradient(135deg, #4BD0A8 0%, #ABDFB7 100%), #FFFFFF;
            box-shadow: 4px 8px 32px 0px rgba(186, 202, 234, 0.2);
        }

        &.blue {
            background: linear-gradient(135deg, #4396FF 0%, #86B3FF 100%), #FFFFFF;
            box-shadow: 4px 8px 32px 0px rgba(186, 202, 234, 0.2);
        }

        &.red {
            background: linear-gradient(135deg, #F6558A 0%, #FF9E9E 100%);
            box-shadow: 4px 8px 32px 0px rgba(186, 202, 234, 0.2);
        }
    }
}
</style>
