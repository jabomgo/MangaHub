<script setup>

import axiosMangaDex from "@/axios";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, computed } from "vue";

const route = useRoute();
const router = useRouter();

const chapterId = ref("");
const arrayData = ref([]);
const imageURL = ref("");
let count = ref(0);

const hash = ref("");

const showImage = async (count) => {
  imageURL.value = await axiosMangaDex.getImagePage(arrayData.value[count.value], hash.value);
};

const handleKeyDown = (e) => {
  if (e.key === 'ArrowLeft') {
    navegatePages('back');
  } else if (e.key === 'ArrowRight') {
    navegatePages('next');
  }
};

onMounted(async () => {
  chapterId.value = route.query.capitulo;
  const page = await axiosMangaDex.getCapterPage(chapterId.value);
  hash.value = page.chapter.hash;
  arrayData.value = page.chapter.data;
  console.log(arrayData.value);
  showImage(count);
  window.addEventListener('keydown', handleKeyDown);
});

function navegatePages(direction) {
  if (direction == "back") {
    if (count.value > 0) {
      count.value--
      showImage(count);
    }
    else {
      console.log("Você já está na página inicial");
    }
  }
  else if (count.value < arrayData.value.length && direction == "next") {
    count.value++
    showImage(count);
  }
  else {
    console.log("Você já está na última página");
  }
};

</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <div class="flex justify-center items-center mb-4 w-full">
      <img :src = "imageURL" class="max-w-full max-h-[80vh] object-contain"/>
    </div>
  </div>
  <div class="flex flex-col items-center justify-center p-4">
      <Button
        @click = 'navegatePages("back")'
        label="Voltar"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg=blue-600"
      />
        <span class="text-lg font-medium">{{count+1}} / {{arrayData.length}}</span>
      <Button
        @click = 'navegatePages("next")'
        label="Avançar"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg=blue-600"
      />
  </div>
</template>
