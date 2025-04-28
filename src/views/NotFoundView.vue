<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="flex flex-column align-items-center py-6">
    <h1>Página não encontrada</h1>
    <Button class="p-button p-component p-button-primary" @click="router.push({ name: 'home' })">
      Voltar para o início
    </Button>
  </div>
</template>

<style scoped></style>
