<script setup>
import axiosMangaDex from "@/axios";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, computed } from "vue";

const route = useRoute();
const router = useRouter();

const chapterId = ref("");
const arrayData = ref([]);
const imageURL = ref("");
let count = 0;

const hash = ref("");
onMounted(async () => {
  chapterId.value = route.query.capitulo;
  const page = await axiosMangaDex.getCapterPage(chapterId.value);
  hash.value = page.chapter.hash;
  arrayData.value = page.chapter.data;
  console.log(arrayData.value);
});

const showImage = async (count) => {
  imageURL.value = await axiosMangaDex.getImagePage(arrayData.value[count], hash.value);
};

function paginacao(direction) {
  if (direction == "back") {
    if (count > 0) {
      count--
      showImage(count);
    }
    else {
      console.log("Você já está na página inicial");
    }
  }
  else if (count < arrayData.value.length && direction == "next") {
    count++
    showImage(count);
  }
  else {
    console.log("Você já está na última página");
  }
};
</script>

<template>
  <div>
    <img :src = "imageURL" />
  </div>
  <div>
    <Button @click = 'paginacao("back")' label="Voltar"/>
    <Button @click = 'paginacao("next")' label="Avançar"/>
  </div>
</template>

<style scoped>

</style>
