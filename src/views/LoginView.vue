<script setup>
import { useSessionStore } from "@/stores/session";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axiosDB from '@/axiosDB';

const router = useRouter();

const email = ref("")
const senha = ref("")
const emailErro = ref("")
const senhaErro = ref("")
const formErro = ref("")

const sessionStore = useSessionStore()

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Expressão regular simples para email
  return regex.test(email);
};

const handleSubmit = async () => {
  // const newUser = {
  //   email: email.value,
  //   senha: senha.value
  // }

  // axiosDB.postUser(newUser)

  emailErro.value = "";
  senhaErro.value = "";
  formErro.value = "";

  if (!email.value) {
    emailErro.value = 'Email é obigatório!'
    return;
  }

  if(!validateEmail(email.value)) {
    emailErro.value = 'Email inválido';
    return;
  }

  if (!senha.value) {
    senhaErro.value = 'Senha é obrigatória';
    return;
  }

  const json = await axiosDB.getByEmail(email.value)

  if (json.senha !== senha.value) {
    formErro.value = 'senha incorreta'
  }else{
    sessionStore.setUserEmail(json.email)
    const favoritos = await axiosDB.getMangaByEmail(json.email)
    sessionStore.addFavorito(favoritos)
    router.push({name:'home'})
  }
}
</script>

<template>
  <div class="flex" style="justify-content: center; padding-top: 8rem;">
    <Card class="flex align-items-center w-25rem h-19rem surface-200">
      <template #header>
        <h1>login</h1>
      </template>
      <template #content>
        <Form @submit.prevent="handleSubmit">
            <label for="Email">Email</label>
          <InputText
          class="w-23rem"
          id="Email"
          v-model="email"
          placeholder="Digite o seu email"
          :class="{'p-invalid': emailErro}"
          />
          <small v-if="emailErro" class="p-error">{{ emailErro }}</small>

          <label for="Senha">Senha</label>
          <InputText
          class="w-23rem"
          type="password"
          v-model="senha"
          id="Senha"
          placeholder="Digite a sua senha"
          :class="{'p-invalid': senhaErro}"
          />
          <small v-if="senhaErro" class="p-error">{{ senhaErro }}</small>

          <Button
          class="w-9rem my-3"
          style="margin-left: 7rem;"
          type="submit"
          label="Entrar"
          :class="{'p-invalid': formErro}"
          />
          <small v-if="formErro" class="p-error">{{ formErro }}</small>
        </Form>
      </template>
      <template #footer>
        <p class="cursor-pointer" @click="router.push('/cadastro');">Não Tem uma Conta? Se cadastre!</p>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.p-invalid {
  border: 1px solid red;
}
.p-error {
  color: red;
  font-size: 12px;
}
</style>
