<template>
    <div class="stat-cards-container">
        <div class="stat-card purple">
            <div class="card-content">
                <div class="title">入驻车场</div>
                <div class="value">1250</div>
                <div class="sub-value">今日新增 +26</div>
            </div>
            <div class="chart-mini">
                <img src="/@/assets/customerize/statistics/top/入驻车场.png" alt="chart" />
            </div>
        </div>

        <div class="stat-card orange">
            <div class="card-content">
                <div class="title">车场商户</div>
                <div class="value">287</div>
                <div class="sub-value">今日新增 +0</div>
            </div>
            <div class="chart-mini">
                <img src="/@/assets/customerize/statistics/top/车场商户.png" alt="chart" />
            </div>
        </div>

        <div class="stat-card green">
            <div class="card-content">
                <div class="title">车场顾客</div>
                <div class="value">8935</div>
                <div class="sub-value">今日新增 +158</div>
            </div>
            <div class="chart-mini">
                <img src="/@/assets/customerize/statistics/top/车场顾客.png" alt="chart" />
            </div>
        </div>

        <div class="stat-card blue">
            <div class="card-content">
                <div class="title">订单总数</div>
                <div class="value">4982</div>
                <div class="sub-value">今日新增 +243</div>
            </div>
            <div class="chart-mini">
                <img src="/@/assets/customerize/statistics/top/订单总数.png" alt="chart" />
            </div>
        </div>

        <div class="stat-card red">
            <div class="card-content">
                <div class="title">订单金额</div>
                <div class="value">3,764,865</div>
                <div class="sub-value">今日新增 +15,540</div>
            </div>
            <div class="chart-mini">
                <img src="/src/assets/customerize/statistics/top/订单金额.png" alt="chart" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'StatCards',
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
            z-index: 1;

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
            z-index: 1;
            display: flex;
            align-items: flex-end;
            height: 140px;

            img {
                height: 100%;
                width: auto;
                object-fit: contain;
            }
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
