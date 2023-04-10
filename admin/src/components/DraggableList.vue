<template>
    <Draggable
    v-model="componentList"
    :group="group"
    class="ff-draggable-list q-list"
    :enabled="enabled"
    :item-key="itemKey"
    @start="dragging = true"
    @end="dragging = false"
    >
    <template #item="{ element }">
      <DraggableListItem :id="element.id" :label="element.label" :description="element.description"></DraggableListItem>
    </template>
  </Draggable>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Draggable from "vuedraggable";
import {useOrderQueueStore} from "src/stores/order-queue";
import DraggableListItem from "./DraggableListItem.vue";
const props = defineProps({
    enabled: {
      default: true,
    },
    listName: {
      required: true,
      type: String
    },
    itemKey: {
      required: true,
      type: String,
    },
    group: {
      required: true,
      type: String,
    }
})
const orderQueueStore = useOrderQueueStore();
const componentList = computed({
  get() {
    const orderList = orderQueueStore.getOrderListByName(props.listName)
    return orderList.getOrders();
  },
  set(value) {
    orderQueueStore.updateList(props.listName, value);
  }
});
const dragging = ref(false);
</script>

<style lang="scss" scoped>
.ff-draggable-list {
  border: 1px solid #E7E0EC;
  height: 390px;
  width: 320px;
  border-radius: 16px;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  & {
    scrollbar-width: auto;
    scrollbar-color: $secondary #E7E0EC;
  }

  /* Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #E7E0EC;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $secondary;
    border-radius: 8px;
    border: 3px solid $secondary;
  }
  div.d-item {
    margin-bottom: 20px;
  }
}
</style>