<template>
  <div class="p-4">
    <a-card title="新布局测试页面" :bordered="false">
      <p>示例页面。</p>
      <a-button type="primary" class="mr-2">操作按钮1</a-button>
      <a-button>操作按钮2</a-button>

      <div class="mt-4">
        <a-table :dataSource="dataSource" :columns="columns" />
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ParkingFeatureDemo',
    setup() {
      return {
        dataSource: [
          {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
          },
          {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
        ],
        columns: [
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
          },
        ],
      };
    },
  });
</script>
