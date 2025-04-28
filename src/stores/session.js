import { ref } from "vue";
import { defineStore } from "pinia";

export const useSessionStore = defineStore(
  "session",
  () => {
    const email = ref("");
    const favoritos = ref([]);

    function setUserEmail(newEmail) {
      email.value = newEmail;
    }

    function addFavorito(item) {
      if (!favoritos.value.includes(item)) {
        favoritos.value.push(item);
      }
    }

    function removeFavorito(item) {
      favoritos.value = favoritos.value.filter((fav) => fav !== item);
    }

    function clearSession() {
      email.value = "";
      favoritos.value = [];
    }

    return {
      email,
      favoritos,
      setUserEmail,
      addFavorito,
      removeFavorito,
      clearSession,
    };
  },
  {
    persist: true,
  },
);
