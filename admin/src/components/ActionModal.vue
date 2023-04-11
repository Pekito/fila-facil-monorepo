<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="action-modal">
            <q-card-section>
                <p class="text-h2"> {{ label }}</p>
                <p class="text-h3">{{ description }}</p>
                {{ listName }}
            </q-card-section>

            <q-card-section>
                <q-list>
                    <q-item clickable v-ripple v-if="isList('prontos')">
                        <q-item-section avatar>
                            <q-icon name="mdi-calendar-lock" />
                        </q-item-section>

                        <q-item-section>Finalizar pedido</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple v-if="!isList('prontos') && !isList('finished')">
                        <q-item-section avatar>
                            <q-icon name="mdi-send" />
                        </q-item-section>

                        <q-item-section>Mover diretamente para pronto</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple v-if="!isList('finished')">
                        <q-item-section avatar>
                            <q-icon name="mdi-circle-edit-outline" />
                        </q-item-section>

                        <q-item-section>Editar pedido</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="mdi-delete" />
                        </q-item-section>
                        <q-item-section>Apagar pedido</q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
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

function onOKClick() {
    onDialogOK()
}
</script>

<style scoped lang="scss">
.action-modal {
    width: 600px;
    padding: 20px;
}
</style>