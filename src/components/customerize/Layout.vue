<template>
  <Layout class="customerize-layout">
    <!-- TopBar at the top, full width -->
    <Header class="customerize-header">
      <TopBar />
    </Header>
    
    <!-- Main content area with Sider and Content -->
    <Layout class="main-container">
      <Sider :width="siderWidth" class="customerize-sider" theme="light" :collapsedWidth="90" collapsible v-model:collapsed="menuCollapsed" :trigger="null">
         <div class="menu-container">
            <SplitMenu 
              :items="menus" 
              @menuClick="handleMenuClick"
              @collapse="handleCollapse"
            />
         </div>
      </Sider>
      <Content class="customerize-content">
        <RouterView />
      </Content>
    </Layout>
  </Layout>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, computed } from 'vue';
  import { Layout } from 'ant-design-vue';
  import { SplitMenu } from './Menu';
  import TopBar from './TopBar/index.vue';
  import { getMenus } from '/@/router/menus';
  import { useRouter } from 'vue-router';
  import { Menu } from '/@/router/types';
  import MultipleTabs from '/@/layouts/default/tabs/index.vue';

  export default defineComponent({
    name: 'CustomerizeLayout',
    components: {
      Layout,
      Sider: Layout.Sider,
      Header: Layout.Header,
      Content: Layout.Content,
      SplitMenu,
      TopBar,
      MultipleTabs,
    },
    setup() {
      const menus = ref<Menu[]>([]);
      const router = useRouter();
      const menuCollapsed = ref(false);

      const siderWidth = computed(() => {
          return menuCollapsed.value ? 90 : 250;
      });

      onMounted(async () => {
        menus.value = await getMenus();
      });

      function handleMenuClick(key: string) {
        if (key && !key.startsWith('http')) {
             router.push(key);
        }
      }
      
      function handleCollapse(collapsed: boolean) {
          menuCollapsed.value = collapsed;
      }

      return {
        menus,
        handleMenuClick,
        menuCollapsed,
        handleCollapse,
        siderWidth,
      };
    },
  });
</script>

<style lang="less" scoped>
  .customerize-layout {
    height: 100vh;
    display: flex;
    flex-direction: column;

    .customerize-header {
      background: #fff;
      padding: 0;
      height: 64px;
      line-height: 64px;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      z-index: 10;
      flex-shrink: 0;
      width: 100%;
    }

    .main-container {
      flex: 1;
      overflow: hidden; // Prevent outer scroll
      display: flex;
      flex-direction: row;
    background: rgba(240, 244, 250, 1);
    }
    
    .customerize-sider {
       background: #fff;
       display: flex;
       flex-direction: column;
       height: 100%;
       border-right: 1px solid #f0f0f0;

       .menu-container {
         flex: 1;
         height: 100%;
         overflow: hidden; // SplitMenu handles its own overflow
       }
    }
    
    .customerize-content {
      margin: 16px;
      padding: 16px;
      flex: 1;
      overflow-y: auto;
      position: relative;
    }
  }
</style>
