<template>
  <div class="split-menu-wrapper">
    <!-- Left Panel: Main Menu (Level 1) -->
    <div class="main-menu-panel">
      <div 
        v-for="item in items" 
        :key="item.path"
        :class="['main-menu-item', { active: activeRootPath === item.path }]"
        @click="handleRootClick(item)"
      >
        <div class="icon-wrapper">
           <!-- Render Icon -->
           <img v-if="getCustomMenuIcon(item.name)" :src="getCustomMenuIcon(item.name)" class="custom-menu-icon" />
           <Icon v-else-if="item.icon" :icon="item.icon" :size="24" />
           <AppstoreOutlined v-else style="font-size: 24px;" />
        </div>
        <div class="label">{{ item.name }}</div>
      </div>
    </div>

    <!-- Right Panel: Sub Menu (Level 2) -->
    <div class="sub-menu-panel" v-if="activeSubItems && activeSubItems.length > 0">
      <!-- <div class="sub-menu-header" v-if="activeRootItem">
          {{ activeRootItem.name }}
      </div> -->
      <div class="sub-menu-list">
        <div 
          v-for="subItem in activeSubItems" 
          :key="subItem.path"
          :class="['sub-menu-item', { active: activeSubPath === subItem.path }]"
          @click="handleSubClick(subItem)"
        >
          <div class="sub-icon">
             <Icon v-if="subItem.icon" :icon="subItem.icon" :size="16" />
             <FileOutlined v-else />
          </div>
          <span class="sub-label">{{ subItem.name }}</span>
        </div>
      </div>
      
      <!-- Collapse Trigger -->
      <div class="collapse-trigger" @click="handleCollapse">
        <MenuFoldOutlined v-if="!collapsed" />
        <MenuUnfoldOutlined v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch, computed, PropType } from 'vue';
  import { Menu } from '/@/router/types';
  import { Icon } from '/@/components/Icon';
  import { AppstoreOutlined, FileOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
  import { useRouter, useRoute } from 'vue-router';

  export default defineComponent({
    name: 'SplitMenu',
    components: { Icon, AppstoreOutlined, FileOutlined, MenuFoldOutlined, MenuUnfoldOutlined },
    props: {
      items: {
        type: Array as PropType<Menu[]>,
        default: () => [],
      },
    },
    emits: ['menuClick', 'collapse'],
    setup(props, { emit }) {
      const router = useRouter();
      const currentRoute = useRoute();
      
      const activeRootPath = ref<string>('');
      const collapsed = ref(false);
      
      const activeRootItem = computed(() => {
        return props.items.find(item => item.path === activeRootPath.value);
      });

      const activeSubItems = computed(() => {
        return activeRootItem.value?.children || [];
      });

      const activeSubPath = computed(() => {
        return currentRoute.path;
      });

      // Initialize selection based on current route
      watch(
        () => currentRoute.path,
        (path) => {
           // Find which root item contains this path
           const root = props.items.find(item => {
             if (item.path === path) return true;
             return item.children?.some(child => child.path === path || path.startsWith(child.path));
           });
           
           if (root) {
             activeRootPath.value = root.path;
           } else if (props.items.length > 0 && !activeRootPath.value) {
             // Default to first item if no match and nothing selected
             activeRootPath.value = props.items[0].path;
           }
        },
        { immediate: true }
      );

      // Also watch items change to set default
      watch(
        () => props.items,
        (newItems) => {
           if (newItems.length > 0 && !activeRootPath.value) {
              activeRootPath.value = newItems[0].path;
           }
        }
      );

      function handleRootClick(item: Menu) {
        if (activeRootPath.value === item.path) {
            // Clicking the active item toggles collapse state
            handleCollapse();
        } else {
            // Switching to a different item
            activeRootPath.value = item.path;
            if (collapsed.value) {
                collapsed.value = false;
                emit('collapse', false);
            }
        }
      }

      function handleSubClick(item: Menu) {
         emit('menuClick', item.path);
      }
      
      function handleCollapse() {
          collapsed.value = !collapsed.value;
          emit('collapse', collapsed.value);
      }

      const customIcons = import.meta.glob('/src/assets/customerize/menu/*.png', { eager: true });
      const iconMap = new Map<string, string>();
      for (const path in customIcons) {
          const fileName = path.split('/').pop()?.replace(/\.\w+$/, '');
          if (fileName) {
              const mod = customIcons[path] as any;
              iconMap.set(fileName, mod.default || mod);
          }
      }

      function getCustomMenuIcon(name: string) {
          return iconMap.get(name);
      }

      return {
        activeRootPath,
        activeRootItem,
        activeSubItems,
        activeSubPath,
        collapsed,
        handleRootClick,
        handleSubClick,
        handleCollapse,
        getCustomMenuIcon,
      };
    },
  });
</script>

<style lang="less" scoped>
  .split-menu-wrapper {
    display: flex;
    height: 100%;
    background: #fff;

    .main-menu-panel {
      width: 90px;
      background: #f8f8f8; // Light gray background for main menu
      // border-right: 1px solid #eee; // Removed border for cleaner look
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 0px;
      overflow-y: auto;
      flex-shrink: 0;
      z-index: 2; // Ensure main menu is above

      .main-menu-item {
        width: 100%;
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: #666;
        transition: all 0.3s;
        border-left: 3px solid transparent;

        &:hover {
           background: #fff;
           color: #333;
        }

        &.active {
          background: #fff;
          color: #333;
          // border-left-color: #1890ff; // Removed blue border for cleaner look, active state is white bg
        }

        .icon-wrapper {
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          
          .custom-menu-icon {
             width: 32px;
             height: 32px;
             object-fit: contain;
          }
        }

        .label {
          font-size: 12px;
          text-align: center;
          line-height: 1.2;
        }
      }
    }

    .sub-menu-panel {
      width: 160px;
      background: #fff; // White background for sub menu
      display: flex;
      flex-direction: column;
      border-right: 1px solid #f0f0f0;
      flex-shrink: 0;
      transition: all 0.3s ease-in-out;
      position: relative;

      .sub-menu-header {
         padding: 16px;
         font-weight: bold;
         color: #333;
         font-size: 14px;
         // border-bottom: 1px solid #eee;
         background: #f5f7fa; // Light background for header
         margin: 10px 10px 0 10px;
         border-radius: 4px;
      }

      .sub-menu-list {
        flex: 1;
        overflow-y: auto;
        padding: 0px 0;

        .sub-menu-item {
          display: flex;
          align-items: center;
          padding: 10px 16px;
          cursor: pointer;
          color: #666;
          transition: all 0.3s;
          font-size: 13px;

          &:hover {
             color: #1890ff;
             background: transparent; // No hover bg, just text color
          }

          &.active {
             color: #1890ff;
             background-color: rgba(41, 126, 237, 0.05);
             font-weight: 500;
          }

          .sub-icon {
             margin-right: 8px;
             display: flex;
             align-items: center;
          }
        }
      }
      
      .collapse-trigger {
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top: 1px solid #f0f0f0;
          cursor: pointer;
          color: #999;
          transition: all 0.3s;
          
          &:hover {
              color: #1890ff;
              background: #f5f7fa;
          }
      }
    }
  }
</style>
