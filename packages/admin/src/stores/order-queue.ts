import { OrderQueue, OrderList, Order } from '@fila-facil/shared/src/entities';
import {OrderListDTO} from "@fila-facil/shared/src/dtos/";
import {OrderListMapper, OrderQueueMapper} from "@fila-facil/shared/src/mappers";
import { reactive } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

const recebidosList = new OrderList('recebidos');
const emAndamentoList = new OrderList('em-andamento', undefined, false, false, true);
const prontosList = new OrderList('prontos',undefined, false, true,true);
const finishedList = new OrderList('finished',undefined, true, false, false);
const queue = reactive(new OrderQueue([recebidosList, emAndamentoList, prontosList, finishedList]));
export const useOrderQueueStore = defineStore('order-queue', {
  state: () => ({
    queue: useLocalStorage("order-queue.queue", queue, {
      serializer: {
        read: (v: any) => {
          if (v) {
            const parsed = JSON.parse(v) as { orderLists: OrderListDTO[] };
            parsed.orderLists.forEach(orderList => {
              const orderListInstance = OrderListMapper.toInstance(orderList);
              queue.updateList(orderListInstance.name, orderListInstance.orders);
            });
            return queue;
          }
          return queue;
        },
      write: (v: any) => JSON.stringify(OrderQueueMapper.toDTO(v)),
      }
    })
  }),
  actions: {
    moveOrder(orderId: string, source: string ,destination: string) {
      queue.moveOrder(orderId, source, destination);
    },
    getOrderList(name: string) {
      return queue.getOrderList(name);
    },
    updateList(name: string, orders: Order[]) {
      queue.updateList(name, orders);
    },
    localUpdate(name: string, orders:Order[]) {
      queue.updateList(name, orders);
    },
    clearList(name: string) {
      queue.clearList(name);
    },
    findOrderById(orderId: string): Order {
      return queue.findOrderById(orderId);
    },
    removeOrder(orderId: string, listName: string) {
      queue.removeOrder(orderId, listName);
    },
    addOrder(order: Order, listName: string) {
      queue.addOrder(order, listName);
    },
    addOrderList(orderList: OrderList) {
      queue.addOrderList(orderList);
    },
    editOrder(order: Order, listName: string) {
      queue.editOrder(order, listName);
    },
    resetAllLists() {
      queue.resetAllLists();
    },
    notifyOrder: (order: Order, listName: string) => {}
  },
  getters: {
    getOrderListByName: (state) => {
      return (name: string): OrderList => {
        return state.queue.getOrderList(name);
      }
    },
    recebidos() {
      return queue.getOrderList("recebidos");
    },
    emAndamento() {
      return queue.getOrderList("em-andamento");
    },
    prontos() {
      return queue.getOrderList("prontos");
    },
    finished() {
      return queue.getOrderList("finished");
    },
    orderLists() {
      return queue.getOrderLists();
    }
  }
})