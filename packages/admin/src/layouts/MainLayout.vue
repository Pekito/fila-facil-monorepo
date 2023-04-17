<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated reveal class="bg-primary text-white ff-header">
      <q-toolbar>
        <q-btn dense flat round :icon="iconName" @click="handleOptionsClick"/>
        <q-toolbar-title class="text-center ff-header-title">
          Fila<br/> Fácil
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.ff-header {
  padding: 10px 0;
  &-title {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 22px;
    text-transform: uppercase;
  }
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute();
const isOnConfigPage = computed(() => {
  return route.path === "/config";
})
const iconName = computed(() => {
  if (isOnConfigPage.value) return "mdi-human-queue";
  else return "mdi-cog";
})
function handleOptionsClick() {
  if (isOnConfigPage.value) router.push("/painel");
  else router.push("/config");
}
</script>