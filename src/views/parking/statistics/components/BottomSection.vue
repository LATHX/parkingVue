<template>
  <div class="bottom-section">
    <div class="left-group">
      <!-- Parking Type Stats -->
      <div class="chart-card">
        <div class="card-header">
          <span class="title">入驻车场类型统计</span>
        </div>
        <div class="stats-content">
          <div class="total-large">
            <div class="number">1250</div>
            <div class="label">总数</div>
          </div>
          <div class="types-row">
            <div class="type-item airport">
              <div class="icon-img">
                <img src="/@/assets/customerize/statistics/bottom/机场.png" alt="机场" />
              </div>
              <div class="info">
                <div class="name">机场</div>
                <div class="count">500</div>
                <div class="percent">占比: 40%</div>
              </div>
            </div>
            <div class="type-item train">
              <div class="icon-img">
                <img src="/@/assets/customerize/statistics/bottom/高铁站.png" alt="高铁站" />
              </div>
              <div class="info">
                <div class="name">高铁站</div>
                <div class="count">750</div>
                <div class="percent">占比: 60%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- City Pie Chart -->
      <div class="chart-card">
        <div class="card-header">
          <span class="title">入驻车场前五城市占比</span>
        </div>
        <div class="chart-container">
          <Pie 
            :chartData="pieData" 
            height="100%" 
            width="100%"
            :option="pieOption"
          />
        </div>
      </div>
    </div>

    <!-- User Stats -->
    <div class="chart-card">
      <div class="card-header">
        <span class="title">用户统计</span>
      </div>
      <div class="stats-content">
        <div class="total-large">
          <div class="number">9222</div>
          <div class="label">总数</div>
        </div>
        <div class="merchant-row">
           <div class="merchant-box">
               <span class="icon">    
                <img src="/@/assets/customerize/statistics/bottom/车场商户统计.png" alt="车场商户" />
             <span>车场商户</span>
            </span>
             
               <span class="count">287</span>
           </div>
        </div>
        <div class="gender-row">
           <div class="gender-box blue">
               <div class="progress-bar">
                   <div class="progress-fill blue" style="height: 60%"></div>
                   <div class="icon">
                    <img src="/@/assets/customerize/statistics/bottom/男性.png" alt="男性" />
                </div>
               </div>
               <div class="info">
                   <div class="label">男性顾客</div>
                   <div class="count blue-text">5361</div>
                   <div class="percent">占比: 60%</div>
               </div>
           </div>
           <div class="gender-box orange">
               <div class="progress-bar">
                   <div class="progress-fill orange" style="height: 40%"></div>
                   <div class="icon">
                    <img src="/@/assets/customerize/statistics/bottom/女性.png" alt="女性" />
                </div>
               </div>
               <div class="info">
                   <div class="label">女性顾客</div>
                   <div class="count orange-text">3574</div>
                   <div class="percent">占比: 40%</div>
               </div>
           </div>
        </div>
      </div>
    </div>

    <!-- City Bubble Chart -->
    <div class="chart-card">
      <div class="card-header">
        <span class="title">顾客前十城市</span>
      </div>
      <div class="bubble-container">
         <!-- Simplified bubble visualization with CSS -->
        <div 
          v-for="(city, index) in bubbleData" 
          :key="index"
          :class="['bubble', city.sizeClass]" 
          :style="city.style"
        >
          {{ city.name }}<br>{{ city.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Pie from '/@/components/chart/Pie.vue';

  export default defineComponent({
    name: 'BottomSection',
    components: { Pie },
    setup() {
      const pieData = [
        { value: 250, name: '广州市' },
        { value: 220, name: '上海市' },
        { value: 130, name: '深圳市' },
        { value: 100, name: '苏州市' },
        { value: 50, name: '重庆市' },
        { value: 250, name: '其它' },
      ];

      const pieOption = {
        color: ['#ff4d4f', '#faad14', '#52c41a', '#1890ff', '#722ed1', '#eb2f96'],
        tooltip: { 
            trigger: 'item',
            formatter: '{b} <br/> {c} ({d}%)' 
        },
        legend: { 
            bottom: '0%', 
            left: 'center',
            width: '100%', // Ensure legend takes full width for centering
            itemGap: 13, // Adjust gap between items
            icon: 'circle', // Change legend icon to circle
            formatter: (name: string) => {
                const item = pieData.find(p => p.name === name);
                const total = pieData.reduce((acc, cur) => acc + cur.value, 0);
                const percent = item ? ((item.value / total) * 100).toFixed(0) + '%' : ''; // Removed decimals for cleaner look
                // Pad name for alignment (simple approach)
                return `${name}  ${item?.value}/${percent}`;
            }
        },
        series: [
          {
            name: 'City',
            type: 'pie',
            radius: ['35%', '50%'], // Further reduced radius
            center: ['50%', '35%'], // Moved up more to increase gap
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 0,
              borderColor: 'transparent',
              borderWidth: 0
            },
            label: { 
               show: false, 
               position: 'center'
            },
            emphasis: {
              label: { 
                  show: false, 
                  fontSize: 16, 
                  fontWeight: 'bold',
                  formatter: '{b}\n{c}/{d}%'
              }
            },
            labelLine: { show: false },
            data: pieData 
          }
        ]
      };

      // Backend data simulation (Sorted by value)
      const customerCities = [
        { name: '广州市', value: 3768 },
        { name: '深圳市', value: 2533 },
        { name: '北京市', value: 1283 },
        { name: '上海市', value: 1119 },
        { name: '苏州市', value: 899 },
        { name: '天津市', value: 721 },
        { name: '东莞市', value: 691 },
        { name: '佛山市', value: 544 },
        { name: '成都市', value: 534 },
        { name: '重庆市', value: 521 },
      ].sort((a, b) => b.value - a.value);

      // Predefined positions designed to avoid collision
      // Rank 1 is at center (50%, 50%)
      const positions = [
          { top: '50%', left: '50%' }, // 1 (Center)
          { top: '20%', left: '25%' }, // 2 (Top Left)
          { top: '20%', left: '75%' }, // 3 (Top Right)
          { top: '80%', left: '25%' }, // 4 (Bottom Left)
          { top: '80%', left: '75%' }, // 5 (Bottom Right)
          { top: '15%', left: '50%' }, // 6 (Top Center)
          { top: '85%', left: '50%' }, // 7 (Bottom Center)
          { top: '50%', left: '15%' }, // 8 (Left Center)
          { top: '50%', left: '85%' }, // 9 (Right Center)
          { top: '35%', left: '10%' }, // 10 (Extra Left)
      ];

      const colors = [
          ['rgba(106, 17, 203, 0.7)', 'rgba(37, 117, 252, 0.7)'], // Blue/Purple
          ['rgba(255, 88, 88, 0.7)', 'rgba(240, 152, 25, 0.7)'], // Red/Orange
          ['rgba(0, 176, 155, 0.7)', 'rgba(150, 201, 61, 0.7)'], // Green
          ['rgba(251, 176, 59, 0.7)', 'rgba(255, 206, 0, 0.7)'], // Yellow
          ['rgba(155, 93, 229, 0.7)', 'rgba(241, 91, 181, 0.7)'], // Purple/Pink
          ['rgba(79, 172, 254, 0.7)', 'rgba(0, 242, 254, 0.7)'], // Light Blue
      ];

      const bubbleData = customerCities.map((city, index) => {
          // Determine size class
          let sizeClass = 'small';
          if (index === 0) sizeClass = 'largest'; // Rank 1 is largest
          else if (city.value > 2000) sizeClass = 'big';
          else if (city.value > 1000) sizeClass = 'medium';

          // Assign position (cycle through if more data than positions)
          const pos = positions[index % positions.length];
          
          // Assign color (cycle through)
          const colorPair = colors[index % colors.length];
          const bgStyle = `linear-gradient(135deg, ${colorPair[0]}, ${colorPair[1]})`;

          return {
              ...city,
              sizeClass,
              style: {
                  top: pos.top,
                  left: pos.left,
                  background: bgStyle,
              }
          };
      });

      return { pieData, pieOption, bubbleData };
    },
  });
</script>

<style lang="less" scoped>
  .bottom-section {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 16px;
    background-color: rgba(240, 244, 250, 1);

    .left-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .chart-card {
      background: white;
      border-radius: 8px;
      padding: 16px;
      height: 300px;
      display: flex;
      flex-direction: column;

      .card-header {
        margin-bottom: 16px;
        .title {
          font-weight: bold;
          font-size: 16px;
        }
      }

      .chart-container {
          flex: 1;
      }

      .stats-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .total-large {
              display: flex;
              align-items: baseline;
              .number { font-size: 40px; font-weight: bold; margin-right: 8px; }
              .label { color: #999; }
          }

          .types-row {
            display: flex;
            justify-content: space-between;
            .type-item {
              flex: 1;
              margin: 0 4px;
              padding: 10px;
              border-radius: 4px;
              text-align: center;
              display: flex;
              flex-direction: column; /* Stack children vertically */
              align-items: flex-start; /* Align children to the left */
              justify-content: center;
              gap: 10px;
              
              &.airport {
                background: #fff7e68e;
                .count { color: #fa8c16;font-size: 40px; }
              }
              
              &.train {
                background: #f6ffedaa;
                .count { color: #52c41a;font-size: 40px;  }
              }
              
              .icon-img {
                width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                }
              }
              .info {
                  text-align: left;
                  width: 100%; /* Ensure info takes full width for alignment */
              }
              .name { font-weight: bold; margin-bottom: 4px;}
              .count { font-size: 20px; margin-bottom: 4px;}
              .percent { font-size: 12px; color: #999; }
            }
          }

          .merchant-row {
              .merchant-box {
                  background: #ffe6e6e9;
                  padding: 10px;
                  border-radius: 4px;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  color: #d40b08bd;
                  .count { font-weight: bold; font-size: 18px; }
              }
          }

          .gender-row {
              display: flex;
              gap: 16px; /* Increased gap */
              .gender-box {
                  flex: 1;
                  padding: 10px;
                  /* Removed border-radius and background as focus is on content */
                  display: flex;
                  align-items: center;
                  gap: 12px;
                  &.blue { background-color: #297eed48; }
                  &.orange { background-color: #fa94504e; }

                  .progress-bar {
                      width: 32px;
                      height: 80px; /* Vertical height */
                      background-color: #f0f0f0; /* Gray background */
                      border-radius: 4px;
                      position: relative;
                      overflow: hidden;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                  }

                  .progress-fill {
                      position: absolute;
                      bottom: 0;
                      left: 0;
                      width: 100%;
                      transition: height 0.3s ease;
                      &.blue { background-color: #297EED; }
                      &.orange { background-color: #FA9550 }
                  }

                  .icon {
                      position: absolute;
                      z-index: 2;
                      font-size: 20px;
                      /* Center the icon */
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                  }

                  .info {
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                  }
                  
                  .label { font-size: 14px; color: #666; }
                  .count { 
                      font-weight: bold; 
                      font-size: 18px; 
                      margin: 2px 0;
                      &.blue-text { color: #297EED; }
                      &.orange-text { color: #FA9550 }
                  }
                  .percent { font-size: 12px; color: #999; }
              }
          }
      }

      .bubble-container {
          position: relative;
          flex: 1;
          .bubble {
              position: absolute;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              color: white;
              font-size: 12px;
              transform: translate(-50%, -50%);
              box-shadow: 0 4px 10px rgba(0,0,0,0.1);
              
              &.largest { width: 110px; height: 110px; font-size: 16px; z-index: 10; }
              &.big { width: 90px; height: 90px; font-size: 14px; }
              &.medium { width: 70px; height: 70px; }
              &.small { width: 50px; height: 50px; font-size: 10px; }

              &.blue { background: linear-gradient(135deg, #6a11cb, #2575fc); }
              &.green { background: linear-gradient(135deg, #00b09b, #96c93d); }
              &.red { background: linear-gradient(135deg, #ff5858, #f09819); }
              &.purple { background: linear-gradient(135deg, #9b5de5, #f15bb5); }
              &.yellow { background: linear-gradient(135deg, #fbb03b, #ffce00); }
          }
      }
    }
  }
</style>
