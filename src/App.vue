<script setup>
import 'primeicons/primeicons.css'
import { RouterView } from 'vue-router'
import router from './router'
import { ref } from 'vue'
const showSearch = ref(false)
const searchInput = ref('')
const items = ref([
  {
    label: 'MangaHub',
    icon: 'pi pi-home',
    command: () => pushTo('home'),
  },
  {
    label: 'Favoritos',
    icon: 'pi pi-heart',
    command: () => pushTo('favoritos'),
  },
  {
    label: 'Pesquisar',
    icon: 'pi pi-search',
    command: ($event) => toggleSearch($event),
  },
  {
    label: 'Conta',
    icon: 'pi pi-user',
    items: [
      {
        label: 'Login',
        icon: 'pi pi-key',
        command: () => pushTo('login'),
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => console.log('logout'),
      },
    ],
  },
])

function toggleSearch(event) {
  showSearch.value = !showSearch.value
}

function search(query) {
  router.push({ name: 'pesquisando', query: { query } })
}
function pushTo(routerName) {
  router.push({ name: routerName })
}
</script>

<template>
  <nav>
    <div class="main-bar">
      <Menubar :model="items" />
      <InputText
        ref="mainBarSearch"
        v-if="showSearch"
        @keyup.enter="search(searchInput)"
        v-model="searchInput"
        style="width: 100%"
        placeholder="Pesquise um manga..."
      />
    </div>
  </nav>
  <RouterView />
</template>

<style scoped></style>
