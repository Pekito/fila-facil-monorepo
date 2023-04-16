import { Namespace, Socket } from 'socket.io';
import { Order, OrderQueue } from '@fila-facil/shared/src/entities';
import { OrderDTO, OrderListDTO } from '@fila-facil/shared/src/dtos/';
import {OrderListMapper, OrderMapper} from '@fila-facil/shared/src/mappers';
import { OrderListAlreadyExistsError } from '@fila-facil/shared/src/errors';

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
      socket.on('first-load', () => {
        const currentOrderQueue = this.orderQueue.getOrderLists();
        socket.emit('current-queue', currentOrderQueue);
      });
      socket.on('overwrite-queue', (orderLists: OrderListDTO[]) => {
        this.orderQueue.resetAllLists();
          orderLists.forEach(orderList => {
            const orderListInstance = OrderListMapper.toInstance(orderList);
            try {
              this.orderQueue.addOrderList(orderListInstance)
            } catch (error) {
              if(error instanceof OrderListAlreadyExistsError) this.orderQueue.updateList(orderList.name, orderListInstance.orders);
            }
          });
      }) 
      socket.on('get-order-lists', () => {
        const orderLists = this.orderQueue.getOrderLists();
        socket.emit('order-lists', orderLists);
      });

      socket.on('get-order-list', (name: string) => {
        const orderList = this.orderQueue.getOrderList(name);
        socket.emit('order-list', orderList);
      });

      socket.on('update-order-list', (name: string, list: OrderDTO[]) => {
        console.log(name, list)
        const listInstance = list.map(order => OrderMapper.toInstance(order));
        this.orderQueue.updateList(name, listInstance);
        socket.broadcast.emit('order-list-updated', {name, list});
        this.clientNamespace.emit('order-list-updated', {name, list});
      });

      socket.on('add-order', (order: Order, name: string) => {
        this.orderQueue.addOrder(order, name);
        const list = this.orderQueue.getOrderList(name);
        socket.broadcast.emit('order-list-updated', {name, list});
        this.clientNamespace.emit('order-list-updated', {name, list});
      });

      socket.on('edit-order', (order: OrderDTO, name: string) => {
        const orderInstance = OrderMapper.toInstance(order);
        this.orderQueue.editOrder(orderInstance, name);
        const list = this.orderQueue.getOrderList(name);
        socket.broadcast.emit('order-list-updated', {name, list});
        this.clientNamespace.emit('order-list-updated', {name, list});
      });

      socket.on('remove-order', (orderId: string, name: string) => {
        this.orderQueue.removeOrder(orderId, name);
        const list = this.orderQueue.getOrderList(name);
        socket.broadcast.emit('order-list-updated', {name, list});
        this.clientNamespace.emit('order-list-updated', {name, list});
      });
      socket.on('disconnect', () => {
        console.log('User disconnected from admin');
      });
    });
  }
}