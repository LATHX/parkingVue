<template>
  <div class="customerize-topbar">
    <div class="left-section">
      <!-- AppLogo with adjusted size/style -->
      <div class="logo-wrapper">
         <AppLogo :showTitle="false" theme="light" />
      </div>
      <div class="company-name">广州成耀物业服务有限公司</div>
      
      <!-- Moved Workbench button to left section -->
      <!-- <a-button type="primary" class="workbench-btn">
        <template #icon><AppstoreOutlined /></template>
        工作台
      </a-button> -->
    </div>

    <div class="right-section">
      <div class="action-item">
         <AppSearch />
      </div>

      <div class="action-item">
        <Notify />
      </div>
      
      <div class="action-item user-item">
        <UserDropDown :theme="theme"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Button } from 'ant-design-vue';
  import { AppstoreOutlined } from '@ant-design/icons-vue';
  import { UserDropDown, Notify } from '/@/layouts/default/header/components';
  import { AppSearch, AppLogo } from '/@/components/Application';
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';

  export default defineComponent({
    name: 'CustomerizeTopBar',
    components: {
      AButton: Button,
      AppstoreOutlined,
      UserDropDown,
      Notify,
      AppSearch,
      AppLogo,
    },
    setup() {
      const { getHeaderTheme } = useHeaderSetting();
      return {
        theme: getHeaderTheme,
      };
    },
  });
</script>

<style lang="less" scoped>
  .customerize-topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 20px;
    // Updated background to a very light blue gradient based on the image
    background: rgba(240, 244, 250, 1);
    // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .left-section {
      display: flex;
      align-items: center;
      
      .logo-wrapper {
        display: flex;
        align-items: center;
        margin-right: 12px;
        
        :deep(img) {
           height: 32px;
           width: auto;
        }
      }

      .company-name {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        letter-spacing: 0.5px;
        margin-right: 40px; // Add spacing before the workbench button
      }

      .workbench-btn {
        border-radius: 4px;
        display: flex;
        align-items: center;
        border: none;
        // Light blue background matching the image
        background-color: #e6f1fe; 
        color: #1890ff;
        font-weight: 500;
        box-shadow: none;
        
        &:hover {
           background-color: #dcf4ff;
        }
        
        :deep(.anticon) {
            margin-right: 6px;
            font-size: 16px;
        }
      }
    }

    .right-section {
      display: flex;
      align-items: center;

      .action-item {
        display: flex;
        align-items: center;
        height: 48px;
        padding: 0 8px;
        cursor: pointer;
        transition: all 0.3s;
        border-radius: 4px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.025);
        }
        
        :deep(.anticon) {
            font-size: 18px;
            color: #666;
        }
      }
    }
  }
</style>
