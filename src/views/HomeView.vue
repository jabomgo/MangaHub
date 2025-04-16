<script setup>
import { ref, onMounted } from 'vue';
import axiosMangaDex from '../axios'

const mangaInfo = ref([])
const coverFileNames = ref([])
const loading = ref(true)

onMounted(async () => {
  const mangaData = await axiosMangaDex.searchManga('')
  const mangasExplorar = mangaData.data;

  mangaInfo.value = mangasExplorar.map(manga => ({
    id: manga.id,
    title: manga.attributes.title.en,
    description: manga.attributes.description.en,
    coverId: manga.relationships?.find(rel => rel.type == 'cover_art')?.id,
  }))

  await fetchCoverFileNames();
  await fetchUrlImage();

  mangaInfo.value.forEach(url => {
    console.log("url: ",url.Url)
  })
})

const fetchCoverFileNames = async () => {
  for (let i = 0; i < mangaInfo.value.length; i++){
    const manga = mangaInfo.value[i]

    if(manga.coverId){
      const coverResponse = await axiosMangaDex.getFileCover(manga.coverId)
      // console.log(coverResponse)
      coverFileNames.value.push({
        fileName: coverResponse.data.attributes.fileName
      })
    }
  }
}

const fetchUrlImage = async () => {
  for (let i = 0; i < coverFileNames.value.length; i++){
    const cover = coverFileNames.value[i]
    const manga = mangaInfo.value[i]

    // console.log(manga.id)
    // console.log(cover.fileName)

    if(manga.coverId){
      const Url = await axiosMangaDex.getCoverArt(manga.id, cover.fileName, 256)
      //  console.log(Url)
      manga.Url = Url;
    }
  }
  loading.value = false;
}
</script>

<template>
  <div class="flex">
    <p>Explorar</p>

    <div v-if="!loading">

      <Card v-for="(item, index) in mangaInfo" :key="index" style="width: 25rem; overflow: hidden" class="mb-3">

        <!-- Header com a imagem do manga -->
        <template #header>
          <img v-if="item.Url" :src="item.Url" alt="cover_art" />
          <div v-else class="manga-image-placeholder">Carregando...</div>
        </template>

        <!-- Título do manga -->
        <template #title>{{ item.title }}</template>

        <!-- Subtítulo ou descrição adicional -->
        <template #subtitle>
          <p>{{ item.description }}</p>
        </template>

        <!-- Conteúdo adicional (se necessário)
        <template #content>
          <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
          </p>
        </template> -->

        <!-- Footer com botões de ação -->
        <template #footer>
          <div class="flex gap-4 mt-1">
            <Button label="Cancel" severity="secondary" outlined class="w-full" />
            <Button label="Save" class="w-full" />
          </div>
        </template>

      </Card>

    </div>

  </div>
</template>
