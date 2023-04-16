import { Namespace, Socket } from 'socket.io';
import { Order, OrderList, OrderQueue } from '@fila-facil/shared/src/entities';
import { Observer } from '@fila-facil/shared/src/entities';
import { OrderListMapper, OrderMapper } from '@fila-facil/shared/src/mappers';
export class ClientHandler {
  private namespace: Namespace;
  private orderQueue: OrderQueue;
  private clientLists: string[];
  constructor(namespace: Namespace, orderQueue: OrderQueue) {
    this.namespace = namespace;
    this.orderQueue = orderQueue;
    this.clientLists = ['prontos', 'em-andamento'];
    this.initializeSocketEvents();
    this.orderQueue.register(new Observer('update-list', this.handleOrderListUpdated.bind(this)));
    this.orderQueue.register(new Observer('notify-order', this.handleNotifyOrder.bind(this)));
  }
  private initializeSocketEvents() {
    this.namespace.on('connection', (socket: Socket) => {
      console.log('New user connected to Client');

      socket.on('first-load', () => {
        socket.emit('first-load', this.clientQueue);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected from Client');
      });
    });
  }
  private get clientQueue() {
    const orderLists = this.orderQueue.getOrderLists();
    return orderLists.filter(orderList => this.clientLists.includes(orderList.name));
  }
  private handleOrderListUpdated(orderList: OrderList) {
    const currentList = this.clientQueue.find(clientQueueList => clientQueueList.name === orderList.name);
    if(currentList) {
      const dto = OrderListMapper.toDTO(currentList);
      this.namespace.emit('order-list-updated', dto);
    }
  }
  private handleNotifyOrder(order: Order, name: string) {
    const orderDto = OrderMapper.toDTO(order);
    this.namespace.emit('notify-order', {order: orderDto, name});
  }
}