<template>
  <div class="customer-page__container">
    <h1 class="customer-page__title">Acompanhe seu pedido</h1>
    <p class="customer-page__subtitle">Você está visualizando a fila no estabelecimento: <span class="text-primary">Pizzaria 3 irmãos.</span></p>
    <header class="customer-page__list__header">
      <p :class="{'customer-page__list__title':true, 'customer-page__list__title--active': currentList === 'em-andamento'}" @click="setCurrentList('em-andamento')">Em andamento</p>
      <p :class="{'customer-page__list__title':true, 'customer-page__list__title--active': currentList === 'prontos'}" @click="setCurrentList('prontos')">Prontos</p>
    </header>
    <OrderList class="customer-page__list__component" :list-name="currentList" :orders="currentOrderList" :list-title="currentTitle"/>
    <p class="customer-page__stats">No momento você está acompanhando: <span class="text-primary">0 pedidos.</span></p>
  </div>
</template>
  
<script setup lang="ts">
  import { computed, ref } from 'vue';
  import OrderList from '@/components/OrderList.vue';
  import { useOrderQueueStore } from '@/stores/order-queue-store';
  const orderQueueStore = useOrderQueueStore();
  const currentList = ref("em-andamento");
  const currentTitle = computed(() => {
    return currentList.value.replace('-', ' ');
  })
  const currentOrderList = computed(() => {
    return orderQueueStore.queue.getOrderList(currentList.value).orders;
  })
  function setCurrentList(listName: string) {
    currentList.value = listName;
  }
</script>
  
<style lang="scss" scoped>
  .customer-page {
    &__container {
      margin: 40px 16px;
    }
    &__title {
      font-family: 'Roboto';
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: -0.44px;
      color: #000108;
      margin-bottom: 13px;
    }
    &__subtitle {
      font-family: 'Roboto';
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: -0.38px;
      color: #090C18;
      margin-bottom: 20px;
    }

    &__list {
      &__header {
        display: flex;
        justify-content: space-around;
        margin: 0 50px;
        text-align: center;
        margin-bottom: 40px;
      }
      &__title{ 
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 32px;
        text-align: center;
        color: #000108;
        &--active {
          border-bottom: 1px solid #000108;
        }
      }
      &__component {
        margin-bottom: 20px;
      }
    }
    &__stats {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: -0.38px;
      color: #090C18;
    }
  }
</style>