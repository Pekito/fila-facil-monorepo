<template>
  <main class="store-page__container">
    <section class="store-page__section store-page__section__info">
      <article class="store-page__section__content">
        <h2 class="store-page__section__title store-page__section__title--info">Acompanhe seu pedido:</h2>
        <p class="store-page__section__description">Escaneando o código QR abaixo para acessar a página do estabelecimento no Fila Fácil:</p>
        <img class="store-page__section__code" :src="qrcode" :alt="url">
      </article>
    </section>
    <section class="store-page__section store-page__section__emAndamento">
      <header class="store-page__header"><h1>Fila Fácil</h1></header>
      <article class="store-page__section__content">
        <h2 class="store-page__section__title store-page__section__title--black">Pedidos em andamento:</h2>
        <StoreList :orders="orderQueueStore.emAndamentoList.orders"></StoreList>
      </article>
    </section>
    <section class="store-page__section store-page__section__prontos">
      <article class="store-page__section__content">
        <h2 class="store-page__section__title">Pedidos prontos:</h2>
        <StoreList :orders="orderQueueStore.prontosList.orders"></StoreList>
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">
import StoreList from '@/components/StoreList.vue';
import { useOrderQueueStore } from '@/stores/order-queue-store';
import { useQRCode } from '@vueuse/integrations/useQRCode'
const orderQueueStore = useOrderQueueStore();
const url = `${window.origin}/painel-cliente`;
const qrcode = useQRCode(url, {margin: 2, height: 320, width: 320});

</script>

<style scoped lang="scss">
  .store-page {
    &__header {
      position: absolute;
      left:0;
      right:0;
      margin-left:auto;
      margin-right:auto;
      h1 {
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 36px;
        line-height: 28px;
        text-align: center;
        color: #0D47A1;
        margin-bottom: 0;
      }
    }
    &__container {
      display: grid;
      position: relative;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 1fr;
    }
    &__section {
      padding: 60px;
      min-height: 100vh;
      &__content {
        margin-top: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      &__title {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 600;
        font-size: 32px;
        line-height: 32px;
        text-align: center;
        color: #FFFFFF;
        margin-bottom: 60px;
        &--info {
          letter-spacing: 2px;
          margin-bottom: 40px;
        }
        &--black {
          color: #303030;
        }
      }
      &__description {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
        margin-bottom: 80px;
      }
      &__info {
        background: $primary;
      }
      &__prontos {
        background: $secondary;
      }
    }
  }
  
</style>