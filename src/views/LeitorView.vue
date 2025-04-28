<script setup>
import axiosMangaDex from "@/axios";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, computed, onUnmounted } from "vue";

const route = useRoute();
const router = useRouter();

const chapterId = ref("");
const arrayData = ref([]);
const imageURL = ref("");
const isLoading = ref(true);
let count = ref(0);

const hash = ref("");

const showImage = async (count) => {
  isLoading.value = true;
  window.scrollTo({ top: 0, behavior: "smooth" });
  imageURL.value = await axiosMangaDex.getImagePage(arrayData.value[count.value], hash.value);
  isLoading.value = false;
};

const handleKeyDown = (e) => {
  if (e.key === "ArrowLeft") {
    navegatePages("back");
  } else if (e.key === "ArrowRight") {
    navegatePages("next");
  }
};

onMounted(async () => {
  chapterId.value = route.query.capitulo;
  const page = await axiosMangaDex.getCapterPage(chapterId.value);
  hash.value = page.chapter.hash;
  arrayData.value = page.chapter.data;
  console.log(arrayData.value);
  showImage(count);
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

function navegatePages(direction) {
  if (direction == "back") {
    if (count.value > 0) {
      count.value--;
      showImage(count);
    } else {
      console.log("Você já está na página inicial");
    }
  } else if (count.value < arrayData.value.length && direction == "next") {
    count.value++;
    showImage(count);
  } else {
    console.log("Você já está na última página");
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-content-center min-h-screen p-4">
    <div v-if="!isLoading" class="flex justify-content-center items-center mb-4 w-full">
      <img :src="imageURL" class="max-w-full max-h-auto object-contain" />
    </div>
    <Skeleton v-else size="50rem"></Skeleton>
  </div>
  <div class="flex flex-col items-center justify-content-center p-4">
    <Button
      @click="navegatePages('back')"
      label="Voltar"
      class="px-4 py-2 bg-orange-500 text-black border-transparent hover:bg-orange-700"
    />
    <span class="text-lg font-medium mx-3">{{ count + 1 }} / {{ arrayData.length }}</span>
    <Button
      @click="navegatePages('next')"
      label="Avançar"
      class="px-4 py-2 bg-orange-500 text-black border-transparent hover:bg-orange-700"
    />
  </div>
</template>
