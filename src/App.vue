<script setup>
import "primeicons/primeicons.css";
import { RouterView } from "vue-router";
import router from "./router";
import { ref } from "vue";
const items = ref([
  {
    label: "MangaHub",
    icon: "pi pi-home",
    command: () => pushTo("home"),
  },
  {
    label: "Favoritos",
    icon: "pi pi-heart",
    command: () => pushTo("favoritos"),
  },
  {
    label: "Pesquisar",
    icon: "pi pi-search",
    command: () => pushTo("pesquisando"),
  },
  {
    label: "Conta",
    icon: "pi pi-user",
    items: [
      {
        label: "Login",
        icon: "pi pi-key",
        command: () => pushTo("login"),
      },
      {
        label: "Sair",
        icon: "pi pi-sign-out",
        command: () => console.log("logout"),
      },
    ],
  },
]);

function pushTo(routerName) {
  router.push({ name: routerName });
}
</script>

<template>
  <nav>
    <div class="main-bar">
      <Menubar :model="items" />
    </div>
  </nav>
  <RouterView />
  <div>
    <footer class="flex justify-content-center py-6">
      <p>
        Dados fornecidos pela
        <a href="https://mangadex.org" target="_blank">MangaDex API</a>
      </p>
    </footer>
  </div>
</template>

<style scoped></style>
