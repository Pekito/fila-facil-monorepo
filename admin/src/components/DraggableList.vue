<template>
    <Draggable
      v-model="componentList"
      :group="group"
      class="draggable-list"
      :enabled="enabled"
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
const props = defineProps({
    enabled: {
      default: true,
    },
    listName: {
      required: true,
      type: String
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
.draggable-list {
  border: 1px solid red;
  height: 200px;
  width: 300px;
  div.d-item {
    margin-bottom: 20px;
  }
}
</style>