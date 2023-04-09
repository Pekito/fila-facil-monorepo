<template>
    <Draggable
      v-model="componentList"
      group="pedido"
      class="draggable-list"
      item-key="id"
      @start="dragging = true"
      @end="dragging = false"
    >
      <template #item="{ element }">
        <div class="d-item">{{element.id}} | {{ element.label }}</div>
      </template>
    </Draggable>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Draggable from "vuedraggable";
import {useOrderQueueStore} from "src/stores/order-queue";
defineProps({
    enabled: Boolean,
    listName: String,
})
const orderQueueStore = useOrderQueueStore();
const componentList = computed({
  get() {
    return orderQueueStore.recebidos.getOrders();
  },
  set(value) {
    orderQueueStore.updateList("recebidos", value);
  }
});
const dragging = ref(false);
</script>

<style lang="scss" scoped>
.draggable-list {
  div.d-item {
    margin-bottom: 20px;
  }
}
</style>