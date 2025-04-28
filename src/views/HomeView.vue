<script setup>
import { ref, onMounted } from "vue";
import axiosMangaDex from "../axios";
import { useRouter } from 'vue-router';

const mangaInfo = ref([]);
const coverFileNames = ref([]);
const router = useRouter();
const loading = ref(true)

const explorarMangas = async () => {
  const mangaData = await axiosMangaDex.searchManga("", 4);
  const mangasExplorar = mangaData.data;

  mangaInfo.value = mangasExplorar.map((manga) => ({
    id: manga.id,
    title:
      manga.attributes?.title?.en ||
      manga.attributes?.altTitles?.["pt-br"] ||
      manga.attributes?.altTitles?.en ||
      "Sem título",
    description: manga.attributes.description.en || "Sem descrição",
    coverId: manga.relationships?.find((rel) => rel.type == "cover_art")?.id,
    imageLoad: false
  }));

  await fetchCoverFileNames();
  await fetchUrlImage();
  loading.value = false
}

const fetchCoverFileNames = async () => {
  for (let i = 0; i < mangaInfo.value.length; i++) {
    const manga = mangaInfo.value[i];

    if (manga.coverId) {
      const coverResponse = await axiosMangaDex.getFileCover(manga.coverId);
      coverFileNames.value.push({
        fileName: coverResponse.data.attributes.fileName,
      });
    }
  }
};

const fetchUrlImage = async () => {
  for (let i = 0; i < coverFileNames.value.length; i++) {
    const cover = coverFileNames.value[i];
    const manga = mangaInfo.value[i];

    if (manga.coverId) {
      const Url = await axiosMangaDex.getCoverArt(manga.id, cover.fileName, 256);
      manga.Url = Url;
      manga.imageLoad = true
    }
  }
};

function navigateToCapitulos(manga) {
  router.push({name: 'capitulos', query: {manga}});
}

function navigateToPesquisa() {
  router.push('/pesquisando');
}
onMounted(() => {
  explorarMangas();
});
</script>

<template>
  <div class="">
    <h1 class="title-container">Explorar</h1>

    <div class="card-list">
      <Card
        v-for="(item, index) in mangaInfo"
        :key="index"
        style="width: 20rem; box-sizing: content-box; margin: 0.5px; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease;cursor: pointer;"
        class="mb-3, card-item"
        @click="navigateToCapitulos(item.id)"
      >
        <template #content>
          <div v-if="!item.imageLoad" class="image-placeholder">
            <i class="pi pi-spin pi-spinner" style="font-size: 2rem; color: #fff;"></i>
          </div>
          <div v-else class="image-container">
            <img v-if="item.Url" :src="item.Url" alt="cover_art" class="card-image" />
          </div>
        </template>

        <template #footer>{{ item.title }}</template>
      </Card>

    </div>
    <div v-if="!loading" class="button-container">
      <Button label="Ver mais"
      icon="pi pi-plus"
      @click="navigateToPesquisa"/>
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 370px;
}

.card-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(196, 194, 194, 0.1);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-container {
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  width: 100%;
}

.title-container {
  padding-bottom: 0.5rem;
  color: white;
  display: flex;
  justify-content: center;
}
</style>
