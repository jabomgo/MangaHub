<script setup>
import 'primeicons/primeicons.css'
import { RouterLink, RouterView } from 'vue-router'

import { ref } from "vue";

const items = ref([
  {
      label: 'Home',
      icon: 'pi pi-home'
  },
  {
      label: 'Projects',
      icon: 'pi pi-search',
      badge: 3,
      items: [
          {
              label: 'Core',
              icon: 'pi pi-bolt',
              shortcut: '⌘+S'
          },
          {
              label: 'Blocks',
              icon: 'pi pi-server',
              shortcut: '⌘+B'
          },
          {
              separator: true
          },
          {
              label: 'UI Kit',
              icon: 'pi pi-pencil',
              shortcut: '⌘+U'
          }
      ]
  }
]);
</script>

<template>
  <RouterView />

  <div class="card">
      <Menubar :model="items">
          <template #start>
              <img src="../public/favicon.ico" alt="Logo" width="35" height="40" class="h-8">
          </template>
          <template #item="{ item, props, hasSubmenu, root }">
              <a v-ripple class="flex items-center" v-bind="props.action">
                  <span>{{ item.label }}</span>
                  <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                  <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                  <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
              </a>
          </template>
          <template #end>
              <div class="flex items-center gap-2">
                  <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
                  <Avatar image="../public/favicon.ico" shape="circle" />
              </div>
          </template>
      </Menubar>
  </div>
</template>

<style scoped>

</style>
