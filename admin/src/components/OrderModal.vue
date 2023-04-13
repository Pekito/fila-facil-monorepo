<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card style="min-width: 350px">
      <q-form @submit="formSubmitHandler">
        <q-card-section>
          <div class="text-h6">{{ modalLabels.title }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="orderForm.label"
            autofocus
            label="Número do Pedido"
            :rules="[
              (val: string) => !isStringEmpty(val) || 'Campo não pode estar vazio',
              (val: string) => alreadyOnQueueValidation()  || 'Número de pedido já cadastrado'
            ]"
            :lazy-rules="true"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="orderForm.description"
            label="Descrição do Pedido"
            :rules="[(val: string) => !isStringEmpty(val) || 'Campo não pode estar vazio']"
            :lazy-rules="true"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" @click="onDialogCancel" v-close-popup />
          <q-btn flat :label="modalLabels.buttonLabel" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { useOrderQueueStore } from '@/stores/order-queue';
import { useQuasar } from 'quasar';
import { reactive } from 'vue';
import { Order, OrderQueue } from '@fila-facil/shared/src/entities';
import {AlreadyOnQueueValidator} from '@fila-facil/shared/src/validations';
import {isStringEmpty} from "@/helpers/string-helpers"
import { TListTypes } from '@/types';

export type OrderModalProps = {
    id?: string,
    label?: string,
    description?: string,
    action: "add" | "edit",
    listContext: TListTypes
}
type OrderModalForm = {
    id?: string,
    label: string,
    description: string,
}
const props = defineProps<OrderModalProps>()
const $q = useQuasar();
const orderQueueStore = useOrderQueueStore();
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
const alreadyOnQueueValidator = AlreadyOnQueueValidator;
const currentList = orderQueueStore.getOrderListByName(props.listContext);

defineEmits([
    ...useDialogPluginComponent.emits
])
const orderForm = reactive<OrderModalForm>({
    id: '',
    label: '',
    description: ''
});
if(props.id) {
const currentOrder = orderQueueStore.findOrderById(props.id);
    orderForm.id = currentOrder.id;
    orderForm.label = currentOrder.label;
    orderForm.description = currentOrder.description;
}

function formSubmitHandler() {
  const order = new Order(orderForm.id, orderForm.description, orderForm.label);
  switch(props.action) {
    case 'add': {
      currentList.addOrder(order);
      $q.notify({
        message: 'Pedido Adicionado com sucesso',
        icon: 'mdi-check-bold'
      });
      break;
    }
    case 'edit':
    currentList.editOrder(order);
    $q.notify({
        message: 'Pedido editado com sucesso',
        icon: 'mdi-check-bold'
      });
    break;
  }
  onDialogOK();
}
function alreadyOnQueueValidation() {
  const queue = orderQueueStore.queue as OrderQueue;
  const order = orderForm as Order;
  return alreadyOnQueueValidator.validate(order, queue);
}

const modalLabels = {
  title: "",
  buttonLabel: ""
}
switch(props.action) {
  case 'add': {
    modalLabels.title = "Novo Pedido";
    modalLabels.buttonLabel = "Adicionar";
    break;
  }
  case 'edit': {
    modalLabels.title = "Editar Pedido";
    modalLabels.buttonLabel = "Confirmar";
    break;
  }
}
</script>

<style scoped lang="scss">
.order-modal {
    width: 600px;
}
</style>