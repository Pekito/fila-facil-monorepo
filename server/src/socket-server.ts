import { Server } from 'socket.io';
import { OrderQueue } from '@fila-facil/shared/src/entities';
import { AdminHandler, ClientHandler } from './handlers/';

export default class SocketServer {
  private io: Server;

  constructor(server: any) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });
    this.initializeSocketEvents();
  }

  private initializeSocketEvents() {
    const orderQueue = new OrderQueue([]);
    const adminNamespace = this.io.of('/admin');
    const clientNamespace = this.io.of('/client');
    new AdminHandler(adminNamespace, orderQueue);
    new ClientHandler(clientNamespace, orderQueue);
  }
}