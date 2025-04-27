<script setup>
import axiosMangaDex from "@/axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const resultado_pesquisa = ref([]);
const pesquisaInput = ref("");
const pesquisandoTitle = ref("");
const limiteDePesquisa = ref(20);
const offset = ref(0);
const loading = ref(false);
const total = ref(0);

const pesquisarMangas = async (customOffset = 0) => {
  loading.value = true;
  try {
    const response = await axiosMangaDex.searchManga(
      pesquisaInput.value,
      limiteDePesquisa.value,
      customOffset,
    );
    resultado_pesquisa.value = response.data;
    total.value = response.total;
    pesquisandoTitle.value = pesquisaInput.value;
    offset.value = customOffset;
  } catch (e) {
    console.log("Erro ao pesquisar manga: ", e);
  } finally {
    loading.value = false;
  }
};

const onPageChange = (event) => {
  const newOffset = event.first;
  pesquisarMangas(newOffset);
};

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  pesquisarMangas();
});

function getTitle(manga) {
  const ptBrTitle = manga.attributes.altTitles.find((titulo) => titulo["pt-br"])?.["pt-br"];
  const enTitle = manga.attributes?.title?.en;
  if (ptBrTitle && enTitle) {
    return `${ptBrTitle} || ${enTitle}`;
  }
  return ptBrTitle || enTitle || "Sem título";
}

function getGenres(manga) {
  return manga.attributes?.tags
    ?.filter((tag) => tag.attributes?.group === "genre")
    .map((tag) => tag.attributes?.name?.en)
    .join(", ");
}

function getLink(data) {
  const link = data?.attributes?.links?.raw;
  return link && link.startsWith("http") ? link : null;
}
</script>

<template>
  <InputText
    ref="mainBarSearch"
    @keyup.enter="pesquisarMangas()"
    v-model="pesquisaInput"
    style="width: 100%"
    placeholder="Pesquise um manga..."
  />

  <div>
    <h1 v-if="pesquisandoTitle">Pesquisando por: "{{ pesquisandoTitle }}"</h1>

    <DataTable
      :value="resultado_pesquisa"
      :rows="limiteDePesquisa"
      stripedRows
      :loading="loading"
      responsiveLayout="scroll"
      showGridlines
    >
      <Column header="Título" :field="getTitle" sortable />
      <Column header="Ano" field="attributes.year" sortable />
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
            @click="router.push({ name: 'capitulos', query: { manga: data.id } })"
          />
        </template>
      </Column>
    </DataTable>

    <Paginator
      :rows="limiteDePesquisa"
      :totalRecords="total"
      :first="offset"
      @page="onPageChange"
      class="mt-4"
    />
  </div>
</template>
