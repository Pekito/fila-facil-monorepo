import { Namespace, Socket } from 'socket.io';
import { OrderQueue } from '@fila-facil/shared/src/entities';

export class ClientHandler {
  private namespace: Namespace;
  private orderQueue: OrderQueue;

  constructor(namespace: Namespace, orderQueue: OrderQueue) {
    this.namespace = namespace;
    this.orderQueue = orderQueue;
    this.initializeSocketEvents();
  }
  private initializeSocketEvents() {
    this.namespace.on('connection', (socket: Socket) => {
      console.log('New user connected to Client');

      socket.once('first-load', () => {
        return this.orderQueue.getOrderLists();
      });

      socket.on('disconnect', () => {
        console.log('User disconnected from Client');
      });
    });
  }
}