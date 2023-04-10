<template>
    <div>
        <draggable-list :list-name="'recebidos'" :group="'pedido'"></draggable-list>
        <draggable-list :list-name="'em-andamento'" :group="'pedido'"></draggable-list>
    </div>
</template>

<script setup>
import DraggableList from '@/components/DraggableList.vue';
</script>

<style lang="scss" scoped>

</style>