<template>
    <div>
        <draggable-list :list-name="'recebidos'" :group="'pedido'" :item-key="'id'"></draggable-list>
        <draggable-list :list-name="'em-andamento'" :group="'pedido'" :item-key="'id'"></draggable-list>
    </div>
</template>

<script setup>
import DraggableList from '@/components/DraggableList.vue';
</script>

<style lang="scss" scoped>

</style>