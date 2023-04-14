import { Namespace, Socket } from 'socket.io';
import { Order, OrderQueue } from '@fila-facil/shared/src/entities';

export class AdminHandler {
  private namespace: Namespace;
  private clientNamespace: Namespace;
  private orderQueue: OrderQueue;

  constructor(namespace: Namespace, clientNamespace: Namespace, orderQueue: OrderQueue) {
    this.namespace = namespace;
    this.clientNamespace = clientNamespace;
    this.orderQueue = orderQueue;
    this.initializeSocketEvents();
  }
  private initializeSocketEvents() {
    this.namespace.on('connection', (socket: Socket) => {
      console.log('New user connected to Admin');
      socket.once('first-load', (orderQueue?: OrderQueue) => {
        const currentOrderQueue = this.orderQueue.getOrderLists();
        if(!orderQueue) {
          socket.emit('current-queue', currentOrderQueue);
        }
        else {
          const ordersLists = orderQueue.getOrderLists();
          ordersLists.forEach(orderList => this.orderQueue.updateList(orderList.name, orderList.orders));
        }
      })
      socket.on('get-order-lists', () => {
        const orderLists = this.orderQueue.getOrderLists();
        socket.emit('order-lists', orderLists);
      });

      socket.on('get-order-list', (name: string) => {
        const orderList = this.orderQueue.getOrderList(name);
        socket.emit('order-list', orderList);
      });

      socket.on('update-order-list', (name: string, list: Order[]) => {
        this.orderQueue.updateList(name, list);
        socket.broadcast.emit('order-list-updated', {name, list});
        this.clientNamespace.emit('order-list-updated', {name, list});
      });

      socket.on('disconnect', () => {
        console.log('User disconnected from admin');
      });
    });
  }
}