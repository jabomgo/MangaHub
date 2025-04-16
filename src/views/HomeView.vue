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
    title: manga.attributes?.title?.en || manga.attributes?.altTitles?.["pt-br"] || manga.attributes?.altTitles?.en   ||"Sem título",
    description: manga.attributes.description.en,
    coverId: manga.relationships?.find(rel => rel.type == 'cover_art')?.id,
  }))

  await fetchCoverFileNames();
  await fetchUrlImage();

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

    <div v-if="!loading" class="card-list">

      <Card v-for="(item, index) in mangaInfo" :key="index" style="width: 20rem; box-sizing:content-box; margin: 0.5px; overflow:hidden" class="mb-3">

        <!-- Header com a imagem do manga -->
        <template #content>
          <div class="image-container">
            <img v-if="item.Url" :src="item.Url" alt="cover_art" class="card-image"/>
          </div>

        </template>

        <!-- Título do manga -->
        <template #footer>{{ item.title }}</template>

      </Card>

    </div>

  </div>
</template>

<style scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;

}

.image-container {
  display: flex; /* Usando flexbox para centralizar a imagem */
  justify-content: center;
  align-items: center;
  height: 370px; /* Definindo uma altura fixa para as imagens */
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit:cover;
  border-radius: 8px;
}
</style>
