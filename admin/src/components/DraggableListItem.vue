<template>
    <q-item class="ff-draggable-list__item" v-ripple>
        <span class="ff-draggable-list__text"><strong>#{{ label }}</strong> | description</span>
    </q-item>
</template>

<script setup lang="ts">
export type DraggableListItemProps = {
    id: string;
    label: string;
    description: string;
}
withDefaults(defineProps<DraggableListItemProps>(), {});
</script>

<style scoped lang="scss">
    .ff-draggable-list {
        &__item {
            width: 270px;
            height: 40px;
            border: 2px solid $secondary;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Roboto';
            &:hover {
                color: $white;
                background: $secondary;
            }
        }
    }
</style>