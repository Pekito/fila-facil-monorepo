import { OrderQueue, OrderList, Order } from '@fila-facil/shared/src/entities';
import { reactive } from 'vue';
import { defineStore } from 'pinia'
const orders: Order[] = [
  new Order(null, "lizard burger", "3721"),
  new Order(null, "happy unicorn", "8745"),
  new Order(null, "purple balloon", "1234"),
  new Order(null, "shiny rainbow", "9999"),
  new Order(null, "fluffy kitten", "5678"),
  new Order(null, "silly monkey", "2468"),
  new Order(null, "giant pizza", "1357"),
  new Order(null, "rainy umbrella", "8021"),
  new Order(null, "lizard burger", "123s"),
  new Order(null, "happy unicorn", "sd12"),
  new Order(null, "purple balloon", "sa21"),
  new Order(null, "shiny rainbow", "tr12"),
  new Order(null, "fluffy kitten", "vcx1"),
  new Order(null, "silly monkey", "sdq4"),
  new Order(null, "giant pizza", "wa1"),
  new Order(null, "rainy umbrella", "sd34")
];
const emAndamentoList = new OrderList('em-andamento', orders);
const prontosList = new OrderList('prontos');
const queue = reactive(new OrderQueue([emAndamentoList, prontosList]));
const notifying: string[] = reactive([]);
export const useOrderQueueStore = defineStore('order-queue', {
  state: () => ({
    queue,
    notifying
  }),
  actions: {
    addToNotifiying(id: string): boolean {
        const alreadyNotifying = this.isNotifying(id);
        if(alreadyNotifying) return false;
        this.notifying.push(id);
        return true;
    },
    removeFromNotifying(id: string): boolean {
        const itemIndex = this.notifying.indexOf(id);
        if(itemIndex === -1) return false;
        this.notifying.splice(itemIndex, 1);
        return true;
    },
    updateList(name: string, orders: Order[]) {
      queue.updateList(name, orders);
        const ids = this.lists.flatMap(orderList => orderList.orders.map(order => order.id));
        this.notifying.forEach(orderId => {
          const exists = ids.includes(orderId);
          if(!exists) this.removeFromNotifying(orderId);
        });
    },
    handleNotification(order: Order) {
      this.removeFromNotifying(order.id);
    },

  },
  getters: {
    isNotifying: (state) => (id: string) => state.notifying.includes(id),
    notifyingCounter: (state) => state.notifying.length,
    prontosList: (state) => state.queue.getOrderList('prontos'),
    lists: (state) => state.queue.getOrderLists()
  }
});
