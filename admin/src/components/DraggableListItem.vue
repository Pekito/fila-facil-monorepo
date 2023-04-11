<template>
    <q-item class="ff-draggable-list__item" v-ripple>
        <q-item-section>
            <span class="ff-draggable-list__text"><strong>#{{ label }}</strong> | description</span>
        </q-item-section>
        <q-item-section avatar>
            <q-icon name="mdi-dots-vertical" class="ff-draggable-list__action" @click="handleActionClick"/>
        </q-item-section>
    </q-item>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import ActionModal from './ActionModal.vue';
import { inject } from 'vue';

export type DraggableListItemProps = {
    id: string;
    label: string;
    description: string;
}
const props = withDefaults(defineProps<DraggableListItemProps>(), {});
const $q = useQuasar();
const listName = inject('listContext') as string;
function handleActionClick() {
    $q.dialog({
        component: ActionModal,
        componentProps: {
            id: props.id,
            label: props.label,
            description: props.description,
            listName
        }
    })
}
</script>

<style scoped lang="scss">
    .ff-draggable-list {
        &__item {
            cursor: pointer;
            max-width: 270px;
            height: 40px;
            border: 2px solid $secondary;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: 'Roboto';
            &:hover {
                color: $white;
                background: $secondary;
            }
            &:active, &.sortable-chosen {
                cursor: pointer;
            }
        }   
        &__action {
            border-radius: 8px;
            padding: 2px;
            &:hover {
                transition: all .5s;
                background: $white;
                color: $secondary;
            }
        }
    }
</style>