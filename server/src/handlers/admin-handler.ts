import { Namespace, Socket } from 'socket.io';
import { Order, OrderQueue } from '@fila-facil/shared/src/entities';
import { OrderDTO, OrderListDTO } from '@fila-facil/shared/src/dtos/';
import {OrderListMapper, OrderMapper} from '@fila-facil/shared/src/mappers';
import { OrderListAlreadyExistsError } from '@fila-facil/shared/src/errors';

export class AdminHandler {
  private namespace: Namespace;
  private orderQueue: OrderQueue;

  constructor(namespace: Namespace, orderQueue: OrderQueue) {
    this.namespace = namespace;
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

      socket.on('update-order-list', (orderList: OrderListDTO) => {
        const orderListInstance = OrderListMapper.toInstance(orderList);
        this.orderQueue.updateList(orderListInstance.name, orderListInstance.orders);
        socket.broadcast.emit('order-list-updated', orderList);
        this.orderQueue.notifyList(orderListInstance);
      });

      socket.on('add-order', (dto: OrderDTO, name: string) => {
        const instance = OrderMapper.toInstance(dto);
        console.log(dto)
        this.orderQueue.addOrder(instance, name);
        const list = this.orderQueue.getOrderList(name);
        socket.broadcast.emit('order-list-updated', {name, list});
        this.orderQueue.notifyList(list);
      });

      socket.on('edit-order', (order: OrderDTO, name: string) => {
        try {
          const orderInstance = OrderMapper.toInstance(order);
          this.orderQueue.editOrder(orderInstance, name);
          const list = this.orderQueue.getOrderList(name);
          socket.broadcast.emit('order-list-updated', {name, list});
          this.orderQueue.notifyList(list);
        } catch (error) {
          socket.emit('server-error', error);
        }
      });

      socket.on('remove-order', (orderId: string, name: string) => {
        try {
          this.orderQueue.removeOrder(orderId, name);
          const list = this.orderQueue.getOrderList(name);
          socket.broadcast.emit('order-list-updated', {name, list});
          this.orderQueue.notifyList(list);
        } catch (error) {
          socket.emit('server-error', error);
        }
      });
      socket.on('clear-list', (name: string) => {
        this.orderQueue.clearList(name);
        const list = this.orderQueue.getOrderList(name);
        socket.broadcast.emit('order-list-updated', list);
        this.orderQueue.notifyList(list);
      });
      socket.on('move-to-finished', (orderId: string) => {
        this.orderQueue.moveOrderTo(orderId, 'finished');
        const prontos = this.orderQueue.getOrderList('prontos');
        const finished = this.orderQueue.getOrderList('finished');
        socket.broadcast.emit('order-list-updated', prontos);
        socket.broadcast.emit('order-list-updated', finished);
        this.orderQueue.notifyList(prontos);
        this.orderQueue.notifyList(finished);
      });
      socket.on('notify-order', (order: OrderDTO, name: string) => {
        const orderInstance = OrderMapper.toInstance(order);
        this.orderQueue.notifyOrder(orderInstance, name);
      })
      socket.on('disconnect', () => {
        console.log('User disconnected from admin');
      });
    });
  }
}