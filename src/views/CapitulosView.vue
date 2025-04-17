<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const router = useRoute();

const mangaCapitulos = ref([1, 1, 1]);
const mangaCover = ref(
  "https://mangadex.org/covers/80422e14-b9ad-4fda-970f-de370d5fa4e5/b7a6b10c-20cf-4c9a-8955-1e79c56ac3fd.jpg.512.jpg",
);
const mangaId = ref("");
const capituloFilter = ref(null)

onMounted(async () => {
  mangaId.value = router.query.manga;
});
</script>

<template>
  <div class="capitulos-container grid w-full my-4">
    <div class="manga-sobre col-12 md:col-4 lg:col-3">
      <Card class="w-full h-full" style="overflow: hidden">
        <template #header>
          <div
            class="flex align-items-center justify-content-center bg-black"
            style="height: 300px;"
          >
            <img alt="user header" :src="mangaCover" class="w-auto h-full object-contain" />
          </div>
        </template>
        <template #title>Título manga</template>
        <template #subtitle>Descrição</template>
        <template #content>
          <p class="m-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
        </template>
      </Card>
    </div>

    <div class="capitulos-list col-12 md:col-8 lg:col-9">
      <div class="flex flex-column gap-3 w-full">
        <InputNumber fluid v-model="capituloFilter" showButtons prefix="Ir para capítulo " placeholder="Ir para capítulo..."/>

        <Card v-for="(capitulo, index) in mangaCapitulos" :key="index" class="w-full">
          <template #title>Capítulo {{ index + 1 }}</template>
          <template #content>
            <Button label="Ler capítulo" />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
