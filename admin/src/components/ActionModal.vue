<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="action-modal">
            <q-card-section>
                <p class="text-h2"> {{ label }}</p>
                <p class="text-h3">{{ description }}</p>
                {{ listName }}
            </q-card-section>

            <q-card-section>
                <q-list v-if="!isList('finished')">
                    <q-item clickable v-ripple v-if="isList('prontos')" @click="handleMoveOrderClick('finished')">
                        <q-item-section avatar>
                            <q-icon name="mdi-calendar-lock" />
                        </q-item-section>

                        <q-item-section>Finalizar pedido</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple v-if="!isList('recebidos')" @click="handleMoveOrderClick('recebidos')">
                        <q-item-section avatar>
                            <q-icon name="mdi-send" />
                        </q-item-section>
                        <q-item-section>Mover para Recebidos</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple v-if="!isList('em-andamento')" @click="handleMoveOrderClick('em-andamento')">
                        <q-item-section avatar>
                            <q-icon name="mdi-send" />
                        </q-item-section>
                        <q-item-section>Mover para Em Andamento</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple v-if="!isList('prontos')" @click="handleMoveOrderClick('prontos')">
                        <q-item-section avatar>
                            <q-icon name="mdi-send" />
                        </q-item-section>
                        <q-item-section>Mover para Prontos</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="mdi-circle-edit-outline" />
                        </q-item-section>

                        <q-item-section>Editar pedido</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple @click="handleRemoveOrderClick()">
                        <q-item-section avatar>
                            <q-icon name="mdi-delete" />
                        </q-item-section>
                        <q-item-section>Apagar pedido</q-item-section>
                    </q-item>
                </q-list>
                <q-list v-else>
                    <q-item clickable v-ripple @click="handleRemoveOrderClick()">
                        <q-item-section avatar>
                            <q-icon name="mdi-calendar-lock" />
                        </q-item-section>

                        <q-item-section>Apagar Pedido</q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { useOrderQueueStore } from '@/stores/order-queue';
export type ActionModalProps = {
    id: string,
    label: string,
    description: string,
    listName: string
}
const props = defineProps<ActionModalProps>()
function isList(list: string) {
    return list === props.listName;
}

defineEmits([

    ...useDialogPluginComponent.emits
])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()


const orderQueueStore = useOrderQueueStore();
function handleRemoveOrderClick() {
    orderQueueStore.removeOrder(props.id);
    onDialogOK();
}
function handleMoveOrderClick(name: 'recebidos' | 'em-andamento' | 'prontos' | 'finished') {
    switch(name) {
        case 'recebidos':
            orderQueueStore.moveToRecebidos(props.id);
        break;
        case 'em-andamento':
            orderQueueStore.moveToEmAndamento(props.id);
        break;
        case 'prontos':
            orderQueueStore.moveToProntos(props.id);
            break;
        case 'finished':
            orderQueueStore.moveToFinished(props.id);
        break;
    };
    onDialogOK();
}
</script>

<style scoped lang="scss">
.action-modal {
    width: 600px;
    padding: 20px;
}
</style>