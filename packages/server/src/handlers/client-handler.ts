import { Namespace, Socket } from 'socket.io';
import { Order, OrderList, OrderQueue } from '@fila-facil/shared/src/entities';
import { Observer } from '@fila-facil/shared/src/entities';
import { OrderListMapper, OrderMapper } from '@fila-facil/shared/src/mappers';
export class ClientHandler {
  private namespace: Namespace;
  private orderQueue: OrderQueue;
  constructor(namespace: Namespace, orderQueue: OrderQueue) {
    this.namespace = namespace;
    this.orderQueue = orderQueue;
    this.initializeSocketEvents();
    this.orderQueue.register(new Observer('notify-list', this.handleOrderListUpdated.bind(this)));
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
    return orderLists.filter(orderList => orderList.client);
  }
  private handleOrderListUpdated(orderList: OrderList) {
    const isClient = this.clientQueue.find(q => q.name === orderList.name);
    if(isClient) {
      const dto = OrderListMapper.toDTO(isClient);
      this.namespace.emit('order-list-updated', dto);
    }
  }
  private handleNotifyOrder({order, name}:  {order: Order, name: string}) {
    const orderDto = OrderMapper.toDTO(order);
    this.namespace.emit('notify-order', {order: orderDto, name});
  }
}