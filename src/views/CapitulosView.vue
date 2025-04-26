<script setup>
import axiosMangaDex from "@/axios";
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const mangaVolumes = ref([]);
const mangaCover = ref("");
const mangaId = ref("");
const capituloFilter = ref(null);
const mangaTitle = ref();
const mangaDescription = ref();
const mangaAltTitle = ref();

onMounted(async () => {
  mangaId.value = route.query.manga;
  const mangaInfo = await axiosMangaDex.getMangaById(mangaId.value);
  console.log(mangaInfo);

  mangaTitle.value = chooseTitle(mangaInfo.data.attributes.title);
  mangaDescription.value = chooseDescription(mangaInfo.data.attributes.description);
  mangaAltTitle.value = altTitlePTBR(mangaInfo.data.attributes.altTitles);
  mangaCover.value = await setCoverArtURL(mangaInfo.data.relationships);

  await loadCapitulos();
});

const setCoverArtURL = async (relations) => {
  const coverObject = relations.find((item) => item.type === "cover_art");
  try {
    const fileCoverResponse = await axiosMangaDex.getFileCover(coverObject.id);
    const fileCoverName = fileCoverResponse.data.attributes.fileName;
    const fileCoverURL = axiosMangaDex.getCoverArt(mangaId.value, fileCoverName);
    return fileCoverURL;
  } catch (e) {
    console.log("Falhar ao carregar imagem do manga: ", e);
  }
};

const chooseTitle = (titlesList) => {
  if (titlesList["pt-br"]) {
    return titlesList["pt-br"];
  }
  if (titlesList["en"]) {
    return titlesList["en"];
  }

  const firstAvailable = Object.values(titlesList)[0];
  return firstAvailable || "";
};

const chooseDescription = (descriptionList) => {
  if (descriptionList["pt-br"]) {
    return descriptionList["pt-br"];
  }
  if (descriptionList["en"]) {
    return descriptionList["en"];
  }

  const firstAvailable = Object.values(descriptionList)[0];
  return firstAvailable || "";
};

const altTitlePTBR = (altTitlesList) => {
  if (!altTitlesList || !altTitlesList.length) return "";

  for (const altTitleObj of altTitlesList) {
    if (altTitleObj["pt-br"]) {
      return altTitleObj["pt-br"];
    }
  }
};

const loadCapitulos = async () => {
  const response = await axiosMangaDex.getCapterVolume(mangaId.value);
  mangaVolumes.value = Object.values(response.volumes);
};

const filteredVolumes = computed(() => {
  const volumes = mangaVolumes.value || [];
  if (!capituloFilter.value) return volumes;

  return volumes
    .map((volume) => {
      const chaptersArray = Object.values(volume.chapters || {});
      const matchingChapter = chaptersArray.find(
        (chapter) => chapter.chapter === String(capituloFilter.value),
      );
      if (matchingChapter) {
        return {
          volume: volume.volume,
          chapters: [matchingChapter],
        };
      }
      return null;
    })
    .filter((volume) => volume !== null);
});
</script>

<template>
  <div class="capitulos-container grid w-full my-4">
    <div class="manga-sobre col-12 md:col-4 lg:col-3">
      <Card class="w-full h-full" style="overflow: hidden">
        <template #header>
          <div
            class="flex align-items-center justify-content-center bg-black"
            style="height: 300px"
          >
            <img
              :alt="`Cover art: ${mangaTitle}`"
              :src="mangaCover"
              class="w-auto h-full object-contain"
            />
          </div>
        </template>
        <template #title>{{ mangaTitle }}</template>
        <template #subtitle>{{ mangaAltTitle }}</template>
        <template #content>{{ mangaDescription }}</template>
      </Card>
    </div>

    <div class="capitulos-list col-12 md:col-8 lg:col-9">
      <div class="flex flex-column gap-3 w-full">
        <InputNumber
          fluid
          v-model="capituloFilter"
          showButtons
          prefix="Ir para capítulo "
          placeholder="Ir para capítulo..."
        />

        <Card v-for="volume in filteredVolumes" :key="volume.volume" class="w-full bg-gray-800">
          <template #title>
            <h3>Volume {{ volume.volume }}</h3>
          </template>
          <template #content>
            <div
              class="py-2 flex justify-content-center"
              v-for="(capitulo, index) in volume.chapters"
              :key="capitulo.chapter"
            >
              <Button
                class="w-full justify-content-start"
                :label="`Ir para capítulo ${capitulo.chapter}`"
                icon="pi pi-book"
                @click="router.push({ name: 'leitor', query: { capitulo: capitulo.id } })"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
