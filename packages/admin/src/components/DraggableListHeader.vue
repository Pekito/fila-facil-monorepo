<template>
    <header class="draggable-list-header">
        <q-input borderless v-model="text" class="draggable-list-header__search" input-class="text-left" placeholder="Buscar">
        <template v-slot:prepend>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
        </template>
    </q-input>
    <q-btn-group>
      <q-btn class="draggable-list-header__button draggable-list-header__button--add" icon="mdi-plus" @click="handleAddClick" />
      <q-btn class="draggable-list-header__button draggable-list-header__button--clear" icon="mdi-delete" @click="handleClearListClick"/>
    </q-btn-group>
    </header>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { useOrderQueueStore } from '@/stores/order-queue';
import { useQuasar } from 'quasar';
import {getListLabel} from '@/helpers/string-helpers';
import { TListTypes } from '@/types';
import OrderModal from './OrderModal.vue';

const listContext = inject('listContext') as TListTypes;
const listLabel = getListLabel(listContext);
const text = ref('');
const orderQueueStore = useOrderQueueStore();
const $q = useQuasar();
function handleClearListClick() {
    $q.dialog({
        message: `Você deseja apagar TODOS itens ${listLabel}?`,
        cancel: {
            label: 'Cancelar',
            color: 'negative'
        },
        ok: {
            label: 'Apagar',
            color: 'primary'
        }
      }).onOk(() => {
            orderQueueStore.clearList(listContext);
            $q.notify({
                    message: 'Lista limpa com sucesso',
                    icon: 'mdi-check-bold',
                })
            })
}
function handleAddClick() {
    $q.dialog({
        component: OrderModal,
        componentProps:{
            action: 'add',
            listContext: listContext
        }
    })
}

</script>

<style scoped lang="scss">
    .draggable-list-header {
        display: flex;
        margin-bottom: 32px;
        height: 38px;
        align-items: flex-start;
        padding-left: 20px;
        &__search {
            align-self: center;
        }
        &__button {
            color: $white;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
            &--add{background: #197C00;}
            &--clear{background: #7C0000;}
        }
    }
</style>