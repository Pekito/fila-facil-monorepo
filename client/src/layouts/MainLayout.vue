<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated reveal class="bg-primary text-white ff-header">
      <q-toolbar>
        <q-toolbar-title class="text-center ff-header-title">
          Fila Fácil
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
    font-size: 22px;
    line-height: 28px;
    text-transform: uppercase;
  }
}
</style>

<script setup lang="ts">

</script>
