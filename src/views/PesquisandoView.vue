<script setup>
import axiosMangaDex from "@/axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const resultado_pesquisa = ref([]);
const pesquisaInput = ref("");
const limiteDePesquisa = ref(20);
const loading = ref(true);
const total = ref(0);

const pesquisarMangas = async () => {
  loading.value = true;
  try {
    const response = await axiosMangaDex.searchManga(pesquisaInput.value, limiteDePesquisa.value);
    resultado_pesquisa.value = response.data;
    total.value = response.total;
    console.log(resultado_pesquisa.value);
  } catch (e) {
    console.log("Erro ao pesquisar manga: ", e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  pesquisarMangas();
});

function getTitle(manga) {
  return manga.attributes?.title?.en ?? "Sem título";
}

function getGenres(manga) {
  return manga.attributes?.tags
    ?.filter((tag) => tag.attributes?.group === "genre")
    .map((tag) => tag.attributes?.name?.en)
    .join(", ");
}

function getLink(data) {
  const rawLink = data?.attributes?.links?.raw;
  return rawLink && rawLink.startsWith("http") ? rawLink : null;
}
</script>

<template>
  <div>
    <DataTable
      :value="resultado_pesquisa"
      :rows="10"
      paginator
      stripedRows
      :loading="loading"
      responsiveLayout="scroll"
    >
      <Column header="Título" :field="getTitle" />
      <Column header="Ano" field="attributes.year" />
      <Column header="Status" field="attributes.status" />
      <Column header="Gêneros" :field="getGenres" />
      <Column header="Conteúdo original">
        <template #body="{ data }">
          <a v-if="getLink(data)" :href="getLink(data)" target="_blank">
            <Button label="Ir" icon="pi pi-external-link" />
          </a>
        </template>
      </Column>
      <Column header="Capítulos">
        <template #body="{ data }">
          <Button
            label="Ir"
            icon="pi pi-book"
            @click="router.push({ name: 'capitulos', query: { mangaId: data.id } })"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped></style>
