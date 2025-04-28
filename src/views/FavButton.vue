<script setup>
import { ref, onMounted } from "vue";
import axiosDB from "@/axiosDB";
import { useSessionStore } from "@/stores/session";

const sessionData = useSessionStore();

const props = defineProps({
  mangaId: {
    type: String,
    required: true,
  },
  isFavorited: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["favorite-toggled"]);

const isFavorited = ref(props.isFavorited);
const isLoading = ref(false);

async function toggleFavorite() {
  isLoading.value = true;

  try {
    const mangaData = {
      email: sessionData.email,
      mangaId: props.mangaId,
    };

    if (isFavorited.value) {
      await axiosDB.DeletFavorito(mangaData.email, mangaData.mangaId);
    } else {
      await axiosDB.postFavoritoManga(mangaData);
    }

    isFavorited.value = !isFavorited.value;
    emits("favorite-toggled", isFavorited.value);
  } catch (error) {
    console.error("Erro ao favoritar mangá:", error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <Button
    @click="toggleFavorite"
    :disabled="isLoading"
    :class="{ favorited: isFavorited, loading: isLoading }"
    class="favorite-button hover:bg-orange-500 hover:border-orange-500"
    :icon="isFavorited ? 'pi pi-heart-fill' : 'pi pi-heart'"
  >
  </Button>
</template>

<style scoped>
.favorite-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.favorite-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.favorite-button:not(:disabled):hover {
  transform: scale(1.05);
}

.favorite-button.favorited {
  background-color: #f97316;
  color: black;
}

.favorite-button:not(.favorited) {
  background-color: #f97316;
  color: black;
}

.loading {
  position: relative;
}
</style>
