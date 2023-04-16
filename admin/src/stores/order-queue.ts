import { OrderQueue, OrderList, Order } from '@fila-facil/shared/src/entities';
import {OrderListDTO} from "@fila-facil/shared/src/dtos/";
import {OrderListMapper, OrderQueueMapper} from "@fila-facil/shared/src/mappers";
import { reactive } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
const orders: Order[] = [
  new Order(null, "lizard burger", "3721"),
  new Order(null, "happy unicorn", "8745"),
  new Order(null, "purple balloon", "1234"),
  new Order(null, "shiny rainbow", "9999"),
  new Order(null, "fluffy kitten", "5678"),
  new Order(null, "silly monkey", "2468"),
  new Order(null, "giant pizza", "1357"),
  new Order(null, "rainy umbrella", "8021")
];
const recebidosList = new OrderList('recebidos', orders);
const emAndamentoList = new OrderList('em-andamento');
const prontosList = new OrderList('prontos');
const finishedList = new OrderList('finished');
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
    moveToRecebidos(orderId: string) {
      queue.moveOrderTo(orderId, 'recebidos');
    },
    moveToEmAndamento(orderId: string) {
      queue.moveOrderTo(orderId, 'em-andamento');
    },
    moveToProntos(orderId: string) {
      queue.moveOrderTo(orderId, 'prontos');
    },
    moveToFinished(orderId: string) {
      queue.moveOrderTo(orderId, 'finished');
    },
    getOrderList(name: string) {
      return queue.getOrderList(name);
    },
    updateList(name: string, orders: Order[]) {
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