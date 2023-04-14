<template>
    <div class="dashboard-page__container">
        <div class="dashboard-page__list recebidos">
            <h2 class=" dashboard-page__title"><span>Recebidos</span></h2>
            <draggable-list :list-name="'recebidos'" :group="'pedido'" :item-key="'id'" :action-header="true"></draggable-list>
        </div>
        <div class="dashboard-page__list emAndamento">
            <h2 class=" dashboard-page__title"><span>Em Andamento</span></h2>
            <draggable-list :list-name="'em-andamento'" :group="'pedido'" :item-key="'id'" :action-header="true"></draggable-list>
        </div>
        <div class="dashboard-page__list prontos">
            <h2 class=" dashboard-page__title"><span>Prontos</span></h2>
            <draggable-list :list-name="'prontos'" :group="'pedido'" :item-key="'id'" :action-header="true"></draggable-list>
        </div>
        <div class="dashboard-page__list finished">
            <h2 class="dashboard-page-finished__title">Histórico de pedidos finalizados</h2>
            <h3 class="dashboard-page-finished__subtitle">A lista de pedidos abaixo será excluída automaticamente em <span class="text-primary">24 horas.</span></h3>
            <draggable-list class="dashboard-page-finished__list" :list-name="'finished'" :group="'finished'" :item-key="'id'" :disabled="true"></draggable-list>
        </div>
    </div>
</template>

<script setup>
import DraggableList from '@/components/DraggableList.vue';
</script>

<style lang="scss" scoped>
 .dashboard-page {
    &__container {
        display: grid;
        gap: 20px;
        max-width: 1000px;
        grid-template-areas:
        "recebidos emAndamento prontos"
        "finished finished finished";
        margin: 40px auto 0 auto;
    }
    &__list {
        &.recebidos {
            grid-area: recebidos;
        }
        
        &.emAndamento {
            grid-area: emAndamento;
        }
        
        &.prontos {
            grid-area: prontos;
        }
        
        &.finished {
            grid-area: finished;
            border: 1px solid #E7E0EC;
            border-radius: 16px;
            padding: 30px 25px;
        }
    }
    &__title {
        font-family: 'Montserrat';
        font-weight: 600;
        font-size: 20px;
        line-height: 32px;
        text-align: center;
        letter-spacing: 2px;
        color: #303030;
        span {
            padding-bottom: 5px;
            border-bottom: 2px solid #303030;
        }
    }
    &-finished {
        &__list {
            width: 100%;
            border: none;
            padding: 0;
            ::v-deep(.scroll-wrapper) {
                width: 100%;
            }
            ::v-deep(.ff-draggable-list) {
                overflow-y: scroll;
                overflow-x: initial;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-auto-rows: 60px;
                grid-column-gap: 20px;
                grid-row-gap: 20px;
            }
            ::v-deep(.ff-draggable-list__item) {
                margin-bottom: 0;
            }
        }
        &__title {
        font-family: 'Roboto';
        font-weight: bold;
        font-size: 16px;
        line-height: 19px;
        letter-spacing: -0.44px;
        color: #252F40;
        }
        &__subtitle {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 19px;
            letter-spacing: -0.38px;
            color: #67748E;
        }
    }
 }
</style>