import { defineStore } from 'pinia';
import {OrderQueue, OrderList, Order} from '@fila-facil/shared/src/entities';
import { reactive } from 'vue';
const recebidosList = new OrderList('recebidos');
const emAndamentoList = new OrderList('em-andamento');
const prontosList = new OrderList('prontos');
const finishedList = new OrderList('finished');

recebidosList.addOrder( new Order(null,"order 1", "label 1"));
recebidosList.addOrder( new Order(null,"order 2", "label 2"));
recebidosList.addOrder( new Order(null,"order 3", "label 3"));
recebidosList.addOrder( new Order(null,"order 4", "label 4"));
recebidosList.addOrder( new Order(null,"order 5", "label 5"));
recebidosList.addOrder( new Order(null,"order 6", "label 6"));
recebidosList.addOrder( new Order(null,"order 7", "label 7"));
recebidosList.addOrder( new Order(null,"order 8", "label 8"));
const queue = reactive(new OrderQueue([recebidosList, emAndamentoList, prontosList, finishedList]));
export const useOrderQueueStore = defineStore('order-queue', {
  state: () => ({
    queue
  }),
  actions: {
    moveToProntos(order: Order) {
        queue.moveOrderTo(order.id, 'prontos');
    },
    moveToFinished(order: Order) {
        queue.moveOrderTo(order.id, 'finished');
    },
    getOrderList(name: string) {
      return queue.getOrderList(name);
    },
    updateList(name: string, orders: Order[]) {
      queue.updateList(name, orders);
    }
  },
  getters: {
    getOrderListByName: (state) => {
      return (name: string): OrderList => {
        return state.queue.getOrderList(name);
      }
    }
    ,
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
  }
});
