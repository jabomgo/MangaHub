<script setup>
import { ref, onMounted } from 'vue';
import axiosMangaDex from '../axios'

const titles = ref([])

onMounted(async () => {
  const mangaData = await axiosMangaDex.searchManga('')
  const mangasExplorar = mangaData.data;

  titles.value = mangasExplorar.map(manga => manga.attributes.title.en)
})
</script>

<template>
  <div>
    <p>Explorar</p>
    <ul>
      <li v-for="(title, index) in titles" :key="index">{{ title }}</li>
    </ul>
  </div>

</template>

