<template>
  <div class="ff-draggable-list__container">
    <DraggableListHeader v-if="actionHeader"></DraggableListHeader>
    <div class="scroll-wrapper">
      <Draggable
      v-model="componentList"
      :group="group"
      class="ff-draggable-list q-list"
      :disabled="disabled"
      :item-key="itemKey"
      @start="dragging = true"
      @end="dragging = false"
      >
        <template #item="{ element }">
          <DraggableListItem :id="element.id" :label="element.label" :description="element.description"></DraggableListItem>
        </template>
    </Draggable>    
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from "vue";
import Draggable from "vuedraggable";
import {useOrderQueueStore} from "src/stores/order-queue";
import DraggableListItem from "./DraggableListItem.vue";
import DraggableListHeader from "./DraggableListHeader.vue";
import { TListTypes } from "@/types";
import { Order } from "@fila-facil/shared/src/entities";
type DraggableListTypes = {
  disabled?: boolean;
  listName: TListTypes;
  itemKey: string;
  group: string;
  actionHeader?: boolean;
  notifyOnAdded?: boolean;  
}
const props = withDefaults(defineProps<DraggableListTypes>(),{
    disabled: false,
    actionHeader: false,
    notifyOnAdded: false,
});
provide("listContext", props.listName);
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
watch(componentList, (newValue, oldValue) => {
  if(props.notifyOnAdded) {
    handleNotifyOrder(newValue, oldValue);
  }
})

function handleNotifyOrder (newValue: Order[], oldValue: Order[]) {
    if(newValue.length > oldValue.length) {
      const addedItem = newValue.find((item) => !oldValue.find(oldItem => oldItem.id === item.id));
      if (addedItem) {
        orderQueueStore.notifyOrder(addedItem, props.listName);
      }
    }
}
</script>

<style lang="scss" scoped>
.scroll-wrapper {
  padding: 0 10px;
  width: 320px;

}
.ff-draggable-list {
  height: 390px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  &__container {
    border: 1px solid #E7E0EC;
    border-radius: 16px;
  }
  &__item {
    width: 270px;
  }
  & > *:not(:last-of-type) {
    margin-bottom: 15px;
  }
  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  & {
    scrollbar-width: auto;
    scrollbar-color: $secondary $white;
  }

  /* Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: $white;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $secondary;
    border-radius: 8px;
    border: 3px solid $secondary;
  }
}
</style>