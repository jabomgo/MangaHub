<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="flex" style="justify-content: center; padding-top: 8rem;">
    <!-- <p>login View</p> -->

    <Card class="flex align-items-center w-25rem h-19rem surface-200">
      <template #header>
        <h1>login</h1>
      </template>
      <template #content>
        <Form>
            <label for="Email">Email</label>
          <InputText
          class="w-23rem"
          id="Email"
          placeholder="Digite o seu email"/>
          <label for="Senha">Senha</label>
          <InputText
          class="w-23rem"
          id="Senha"
          placeholder="Digite a sua senha"/>
          <Button
          class="w-9rem my-3"
          style="margin-left: 7rem;"
          type="submit"
          label="Entrar"/>
        </Form>
      </template>
      <template #footer>
        <p class="cursor-pointer" @click="router.push('/cadastro');">Não Tem uma Conta? Se cadastre!</p>
      </template>
    </Card>
  </div>
</template>

<style scoped>

</style>
